const express = require('express')
const app = express()
const CarroController = require('../controllers/CarroController')
const controller = new CarroController()

app.get('/carro', controller.getCarros)
app.post('/carro', controller.createCarro)
app.get('/carro/:id', controller.getCarroById)
app.put('/carro/:id', controller.updateCarro)
app.delete('/carro/:id', controller.deleteCarro)

module.exports = app