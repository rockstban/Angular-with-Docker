'use strict'
var mongoose = require('mongoose');//Cargar el modulo de mongoose
var Schema = mongoose.Schema;//Cargar el modulo de Schema de mongoose

//Esquema para las amenidades de la habitacion
var amenidadesSchema = new Schema({
    facilidadesAcceso: [String],
    bano: [String],
    habitacion: [String],
    entretenimiento: [String],
    alimentosBebidas: [String],
    internet: [String],
    mas: [String]
}, {_id: false})

//Esquema para la habitacion
var habitacionSchema = new Schema({
    imagenes: [String],
    nombre: String,
    capacidad: Number,
    camaGrande: Number,
    camaIndividual: Number,
    precio: Number,
    totalRooms: Number,
    disponibilidad: Boolean,
    disponibles: Number,
    amenidades: amenidadesSchema
})

//Exportar el modulo habitacion para que pueda ser utilizado en otros archivos
module.exports = mongoose.model('Habitacion', habitacionSchema, 'habitaciones');