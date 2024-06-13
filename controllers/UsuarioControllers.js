const UserSchema = require("../models/Usuario") // Accedemos a los datos del modelo
const bcrypt = require('bcrypt') // Importamos la libreria de encriptacion
const jwt = require('jsonwebtoken')

// Permite agrupar atributos y funciones
class UsuarioController {

    async getUsuarios(req, res) {
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){

        // Encriptando la contraseña
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
       
        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword, // Guardo la contraseña hasheada
        }

        await UserSchema(nuevoUsuario).save()
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Guardado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var updateUser = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,
        }

        await UserSchema.findByIdAndUpdate(id, updateUser, { new: true })
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario Eliminador correctamente"})
    }

    async login(req, res){
        // Capturo el correo y a contraseña ingresados
        var correo = req.body.correo;
        var password = req.body.password

        // Buscar el usuario por el correo
        var usuario = await UserSchema.findOne({correo})
        if(usuario){
            // Comparar la contraseña ingresada con la registrada por el usuario
                                                    //   Ingreso      Almacenado [Encriptado]
            var verificacionClave = await bcrypt.compare(password, usuario.password)
            // Si la verificacion de la clave es exitosa
            if(verificacionClave){

                // Creo un token con la informacion codificada del usuario
                usuario.password = null
                const token = jwt.sign({usuario}, 'secret', { expiresIn: '1h'})

                res.send({"status": "success", 
                            "message": "Bienvenido " + usuario.nombre + " " + usuario.apellidos,
                            "user_id": usuario._id,
                            "token": token
                    })
            }else{
                res.send({"status": "error", "message": "Datos invalidos"})
            }
        }else{
            // Cuando el correo ingresado no esta registrado
            res.send({"status": "error", "message": "El correo ingresado no existe"})
        }
    }
}

module.exports = UsuarioController