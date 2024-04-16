'use strict'
var mongoose = require('mongoose');//Cargamos el modulo de mongoose para poder acceder a la base de datos
var Schema = mongoose.Schema;//Cargamos el modulo de Schema de mongoose para poder crear esquemas

//Esquema para las habitaciones con huespedes
var habitacionesSchema = new Schema({
    habitacionId: { type: Schema.Types.ObjectId, ref: 'habitaciones' },
    adultos: Number,
    ninos: Number,
    cantidad: { type: Number, default: 1}
});

//Esquema para los pagos
var pasgosSchema = new Schema({
    captureId: String,
    monto: Number,
    fecha: { type: Date, default: Date.now }
});

//Esquema para los reembolsos
var reembolsosSchema = new Schema({
    captureId: String,
    monto: Number,
    fecha: { type: Date, default: Date.now }

});

//Esquema para las reservas
var reservaSchema = new Schema({
    nombreCliente: String,
    numeroContacto: String,
    correoElectronico: String,
    fechaInicio: Date,
    fechaFin: Date,
    precioTotal: Number,
    habitaciones: [habitacionesSchema],
    pagos: [pasgosSchema],
    reembolsos: [reembolsosSchema]
});

//Exportar el modelo de reserva
module.exports = mongoose.model('Reserva', reservaSchema, 'reservas');