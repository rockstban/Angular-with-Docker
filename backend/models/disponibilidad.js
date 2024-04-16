'use strict'
var mongoose = require('mongoose');//Cargar el modulo de mongoose
var Schema = mongoose.Schema;//Cargar el modulo de Schema de mongoose

//Esquema para la disponibilidad
var disponibilidadSchema = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    habitacionId: { type: Schema.Types.ObjectId, ref: 'habitaciones' },
    reservaId: { type: Schema.Types.ObjectId, ref: 'reservas' },
    cantidad: { type: Number, default: 1 }
});

//Exportar el modelo de disponibilidad
module.exports = mongoose.model('Disponibilidad', disponibilidadSchema, 'disponibilidades');
