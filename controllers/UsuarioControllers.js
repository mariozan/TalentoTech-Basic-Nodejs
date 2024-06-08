const UserSchema = require("../models/Usuario") // Accedemos a los datos del modelo

// Permite agrupar atributos y funciones
class UsuarioController {

    async getUsuarios(req, res) {
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){
       
        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }

        await UserSchema(nuevoUsuario).save();

        res.send("Guardado correctamente")
    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;

        var updateUser = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }

        await UserSchema.findByIdAndUpdate(id, updateUser, { new: true })

        res.json({"status": "success", "message": "Usuario Actualizado correctamente"})
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario Eliminador correctamente"})
    }
}

module.exports = UsuarioController