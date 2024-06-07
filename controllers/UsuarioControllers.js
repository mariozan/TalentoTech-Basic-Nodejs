const UserSchema = require("../models/Usuario") // Accedemos a los datos del modelo

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
}

module.exports = UsuarioController