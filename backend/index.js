'use strict'

//cargar el modulo dotenv para poder utilizar las variables de entorno
require('dotenv').config();

var mongoose = require('mongoose');// Cargar el modulo de mongoose
var port = process.env.PORT || '3600'; //Puerto donde se ejecutara el servidor

//Nos aseguramos que mongoose utilice las promesas nativas de JS
mongoose.promise = global.Promise;

var app = require('./app');//Cargar el modulo de app.js

//Definir la cadena de conexion a la base de datos, y el servidor backend
mongoose.connect(process.env.DATABASE)//DATABASE es la variable de entorno que contiene la URL de la base de datos
    .then(() => {
        console.log('La conexion a la base de datos se ha realizado correctamente');

        //Si la conexion a la base de datos es correcta, entonces se ejecuta el servidor
        app.listen(port,'0.0.0.0', () => {
            console.log('El servidor está corriendo en http://localhost:' + port);
        })
    })
    .catch(err => console.log(err))

