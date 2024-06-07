const express = require('express') // Importando la libreria
const app = express() // Inicializamos la variable de la libreria
const UsuarioController = require('../controllers/UsuarioControllers') // Importando el controlador
const controller = new UsuarioController(); // Creando una instancia

// Creamos nuestros servicios web
app.get('/usuario', controller.getUsuarios)
app.post('/usuario', controller.createUsuario)

module.exports = app