'use strict'

var emailTemplate = require('../config/template')//Tmeplate para el correo
require('dotenv').config();//Cargar el modulo dotenv para poder utilizar las variables de entorno
var sgMail = require('@sendgrid/mail');//Cargamos el modulo de sendgrid para poder enviar correos

sgMail.setApiKey(process.env.SENDGRID_API_KEY);//Configuramos la api key de sendgrid

//Funcion para enviar el correo
const sendMail = (email, nombre, codigoReserva) => {
  
  //Configuracion del correo
  const msg = {
    to: email,
    from: 'hotelcopodenieve98@gmail.com',
    subject: 'Reserva Hotel Copo de Nieve',
    text: 'and easy to do anywhere, even with Node.js',
    html: emailTemplate.template(nombre, codigoReserva),
  };

  //Envio del correo
  sgMail.send(msg).then((response) => {
  }).catch((error) => {
    console.error(error)
  })

}

//Exportamos la funcion para poder utilizarla en otros archivos
exports.enviarCorreo = (email, nombre, codigoReserva) => sendMail(email, nombre, codigoReserva);