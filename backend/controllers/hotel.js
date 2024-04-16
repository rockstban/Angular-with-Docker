'use strict'

var Habitacion = require('../models/habitacion');//Cargar el modelo de habitacion
var Disponibilidad = require('../models/disponibilidad');//Cargar el modelo de disponibilidad
var path = require('path');//Cargar el modulo de path de nodejs
var fs = require('fs');//Cargar el modulo de file system de nodejs
var Reserva = require('../models/reserva');//Cargar el modelo de reserva
var Email = require('../config/email');//Cargar el modulo de email
var mongoose = require('mongoose');//Cargar el modulo de mongoose
const disponibilidad = require('../models/disponibilidad');

let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default || nodeFetch;
});

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = process.env.ENVIRONMENT === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

function get_access_token() {
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch(endpoint_url + '/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(json => {
            return json.access_token;
        })
}

function refund_payment(capture_id, access_token, refundAmount) {
    const refundEndpoint = endpoint_url + `/v2/payments/captures/${capture_id}/refund`;
    // Retornar la Promesa directamente
    return fetch(refundEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({
            amount: {
                value: refundAmount,
                currency_code: 'USD'
            }
        })
    })
    .then(res => res.json())
    .then(json => {
        // Retornar el objeto JSON completo
        return json;
    })
    .catch(err => {
        console.error(err);
        // Puedes optar por retornar un objeto de error personalizado si lo deseas
        return { error: 'Error al procesar la solicitud de reembolso' };
    });
}

//Controlador del hotel
var controller = {
  //Método del home
  home: function (req, res) {
    return res
      .status(200)
      .send(
        "<h1>Hola desde el controllador</h1>" + " <h2>Esto es el home</h2>"
      );
  },
  //Metodo para obtener las habitaciones disponibles en base a las fechas de checkin y checkout
  //y ademas de la cantidad de personas por habitacion
  obtenerHabitaciones: async function (req, res) {
    try {
      //Se obtienen los parámetros de la peticion
      var huespedes = req.body.huespedes;
      var fechaInicio = req.body.fechaInicio;
      var fechaFin = req.body.fechaFin;

      //Encontrar habitaciones que tienen una capacidad mayor o igual a la cantidad de huespedes
      //$gte (granter than or equal to)
      var habitaciones = await Habitacion.find({
        capacidad: { $gte: huespedes },
      });

      //Recorrer las habitaciones para asignar la disponibilidad segun las fechas
      for (let habitacion of habitaciones) {
        var habitacionId = habitacion._id; //Obtener el id de la habitacion

        //encontrar los documentos en la colección de disponibilidades que se superponen
        // o chocan con las fechas deseadas
        var fechasSuperpuestas = await Disponibilidad.find({
          habitacionId: habitacionId,
          fechaInicio: { $lt: new Date(fechaFin) },
          fechaFin: { $gt: new Date(fechaInicio) },
        });

        //Calcular el total de habitaciones con id = habitacionId que estan reservadas en las fechas deseadas
        var totalReservadas = fechasSuperpuestas.reduce(
          (total, disponibilidad) => total + disponibilidad.cantidad,
          0
        );

        //Obtener el numero total de habitaciones del tipo habitacionId
        var totalHabitaciones = habitacion.totalRooms;

        //# de habitaciones disponibles en las fechas deseadas
        var disponibles = totalHabitaciones - totalReservadas;

        //Asignar la disponibilidad a la habitacion
        if (totalReservadas < totalHabitaciones) {
          habitacion.disponibilidad = true;
          habitacion.disponibles = disponibles;
          //console.log(habitacionId+ ' - Habitacion disponible: ' + habitacion.disponibles + " "+habitacion.disponibilidad);
        } else {
          habitacion.disponibilidad = false;
          habitacion.disponibles = 0;
          //console.log(habitacionId+ ' - Habitacion no disponible: ' + habitacion.disponibles + " "+habitacion.disponibilidad);
        }
      }
      return res.status(200).send({ habitaciones });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  obtenerImagen: async function (req, res) {
    //Se obtienen los parametros de la peticion
    var imagen = req.params.imagen;
    var path_file = "./uploads/" + imagen;
    try {
      //Se verifica si la imagen existe en la ruta expecificada
      fs.exists(path_file, function (exists) {
        //Si la imagen existe se la envia, de lo contrario se envia un mensaje de error
        if (exists) {
          res.sendFile(path.resolve(path_file));
        } else {
          res.status(404).send({ message: "Habitacion no encontrada" });
        }
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  crearOrden: async function (req, res) {
    try {
      //Obtener el token de acceso para la API de PayPal
      const access_token = await get_access_token();

      //Objeto javascript que contiene los datos de la orden de compra
      let order_data_json = {
        intent: req.body.intent.toUpperCase(), //intencionnde compra
        purchase_units: [
          {
            //Unidad de compra donde se especifica el monto y la moneda
            amount: {
              currency_code: "USD",
              value: req.body.value,
            },
          },
        ],
      };

      //Convertir el objeto javascript a una cadena JSON para enviarlA a la API de PayPal
      const data = JSON.stringify(order_data_json);

      //Enviar la solicitud de creacion de la orden de compra a la API de PayPal
      const response = await fetch(endpoint_url + "/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: data, //Se envían los datos de la orden en el cuerpo de la solicitud
      });

      //Convertir la respuesta de la API de PayPal a un objeto JSON
      const json = await response.json();

      //Enviar la respuesta de la API de PayPal al frontend
      res.send(json);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  completarOrden: async function (req, res) {
    try {
      //Obtener el token de acceso para la API de PayPal
      const access_token = await get_access_token();

      //Realizar la solicitud a la API de PayPal para completar la orden de compra
      //Se envía el id de la orden y la intencion de compra
      const response = await fetch(
        endpoint_url +
          "/v2/checkout/orders/" +
          req.body.order_id +
          "/" +
          req.body.intent,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      //Convertir la respuesta de la API de PayPal a un objeto JSON
      const json = await response.json();

      //Enviar la respuesta de la API de PayPal al frontend
      res.send(json);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  crearReserva: async function (req, res) {
    try {
      //Obtener las habitaciones desde el frontend
      let habitaciones = req.body.habitaciones;

      //Objeto para contar la cantidad de habitaciones de cada tipo
      let conteo = {};

      //Contar la cantidad de habitaciones de cada tipo
      habitaciones.forEach(function (habitacion) {
        if (conteo[habitacion.habitacionId]) {
          conteo[habitacion.habitacionId] += 1;
        } else {
          conteo[habitacion.habitacionId] = 1;
        }
      });

      //Convertir el objeto conteo a un array
      let conteoArray = Object.keys(conteo).map(function (id) {
        return { habitacionId: id, cantidad: conteo[id] };
      });

      //Recorrer el array de conteoArray para verificar si hay suficientes habitaciones disponibles
      for (let habitacion of conteoArray) {
        //encontrar los documentos en la colección de disponibilidades que se superponen
        // o chocan con las fechas deseadas
        let fechasSuperpuestas = await Disponibilidad.find({
          habitacionId: habitacion.habitacionId,
          fechaInicio: { $lt: new Date(req.body.fechaFin) },
          fechaFin: { $gt: new Date(req.body.fechaInicio) },
        });

        //Calcular el total de habitaciones con id = habitacionId que estan reservadas en las fechas deseadas
        let totalRoomsReserved = fechasSuperpuestas.reduce(
          (total, disponibilidad) => total + disponibilidad.cantidad,
          0
        );

        //Obtener el numero total de habitaciones del tipo habitacionId
        let room = await Habitacion.findById(habitacion.habitacionId);
        let totalRooms = room.totalRooms;

        //Comprobar si hay suficientes habitaciones disponibles
        if (totalRoomsReserved + habitacion.cantidad > totalRooms) {
          return res
            .status(400)
            .send(
              "No hay suficientes habitaciones disponibles para realizar la reserva"
            );
        }
      }

      //Crear la reserva
      var reserva = new Reserva({
        nombreCliente: req.body.nombreCliente,
        numeroContacto: req.body.numeroContacto,
        correoElectronico: req.body.correoElectronico,
        fechaInicio: new Date(req.body.fechaInicio),
        fechaFin: new Date(req.body.fechaFin),
        precioTotal: req.body.precioTotal,
        habitaciones: req.body.habitaciones,
        pagos: req.body.pagos,
        reembolsos: req.body.reembolsos,
      });

      //Guardamos la reserva en la base de datos
      await reserva.save();

      //Para cada habitacion de la reserva, crear una documento de disponibilidad
      for (let habitacion of req.body.habitaciones) {
        //Creamos un documento de disponibilidad
        var disponibilidad = new Disponibilidad({
          fechaInicio: new Date(req.body.fechaInicio),
          fechaFin: new Date(req.body.fechaFin),
          habitacionId: habitacion.habitacionId,
          reservaId: reserva._id,
        });

        //Guardamos el documento de disponibilidad en la base de datos
        await disponibilidad.save();
      }
      
      //Enviar un correo electronico al cliente
      Email.enviarCorreo(
        req.body.correoElectronico,
        req.body.nombreCliente,
        reserva._id
      );

      //Si todo es correcto, enviar una respuesta de exito
      res.status(200).send(reserva); //
    } catch (err) {
      //Si ocurre un error, enviar una respuesta de error
      res.status(500).send("Ha ocurrido un error: " + err);
    }
  },
  //eliminar una reserva de la base de datos
  eliminarReserva: async function (req, res) {
    const reservaId = req.params.id;
    try {
      // Buscar la reserva en la base de datos
      const reserva = await Reserva.findById(reservaId);
      if (!reserva) {
        return res.status(404).send({ message: "Reserva no encontrada" });
      }
      // Comprobar si la reserva se está cancelando dentro del plazo de reembolso
      const ahora = new Date();
      const checkIn = new Date(reserva.fechaInicio);
      const plazoReembolso = 2; // Define el plazo de reembolso en días
      const diferenciaDias = Math.ceil(
        (checkIn - ahora) / (1000 * 60 * 60 * 24)
      );

      if (diferenciaDias >= plazoReembolso) {
        const accessToken = await get_access_token();
        // Realizar el reembolso para cada pago de la reserva
        while (reserva.pagos.length > 0) {
          const captureId = reserva.pagos[0].captureId;
          const monto = reserva.pagos[0].monto;
          var status = await refund_payment(captureId, accessToken, monto);
          console.log(
            `Reembolso del pago ${captureId} con el monto ${monto}:`,
            status.status
          );
          reserva.pagos.shift();
        }
        // Eliminar la reserva de la base de datos
        await Reserva.findByIdAndDelete(reservaId);
        // Eliminar los documentos de disponibilidad asociados a la reserva
        await Disponibilidad.findOneAndDelete({reservaId: reservaId});
        
        return res
          .status(200)
          .send({ message: "Se elimino la reserva y se hizo el reembolso con éxito" });
      } else {
        return res
          .status(400)
          .send({ message: "No se puede realizar el reembolso" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Error al procesar la solicitud" });
    }
  },
  modificarReserva: async function (req, res) {
    try {
      // Buscar la reserva en la base de datos
      const reserva = await Reserva.findById(req.params._id);
      if (!reserva) {
        return res.status(404).send({ message: "Reserva no encontrada" });
      }
      //chechear si la reserva se esta modificando dentro del plazo de reembolso
      const ahora = new Date();
      const checkIn = new Date(reserva.fechaInicio);
      const plazoReembolso = 2; // Define el plazo de reembolso en días
      const diferenciaDias = Math.ceil(
        (checkIn - ahora) / (1000 * 60 * 60 * 24)
      );

      if (diferenciaDias < plazoReembolso) {
        return res.status(400).send({ message: "No se puede modificar la reserva" });
      } else {
        //ver si debe pagar mas o reembolsarse parte de lo pagado en la reserva anterior
        const precioTotal_new = req.body.precioTotal;
        const precioTotal_old = reserva.precioTotal;
        let montoArembolsar = 0;
        let montoApagar = 0;

        switch (true) {
          case precioTotal_new > precioTotal_old && req.body.pagos.length > reserva.pagos.length:
            
              montoApagar = precioTotal_new - precioTotal_old;
              console.log("El monto a pagar es mayor que el monto pagado");
              console.log("Monto a pagar: ", montoApagar);
              console.log("Monto Pagado: ", req.body.pagos[req.body.pagos.length - 1].monto);
              // Registrarse el pago              
              if(req.body.pagos[req.body.pagos.length - 1].monto == montoApagar){
                
              // reserva.pagos.push(req.pagos[req.body.pagos.length - 1]);
              console.log("Pago registrado: ", req.body.pagos[req.body.pagos.length - 1]);
              }
              else{
                return res.status(400).send({ message: "El monto a pagar no coincide con el monto pagado" });

              }
            break;

          case precioTotal_new < precioTotal_old && req.body.pagos.length==0:
            montoArembolsar = precioTotal_old - precioTotal_new;
            console.log("El monto a pagar es menor que el monto pagado");
            console.log("monto a reembolsar: ", montoArembolsar);
            //hacer rembolsos de acuerdo a los pagos realizados
            let i = 0; // Inicializar el índice
            while (montoArembolsar > 0 && i < reserva.pagos.length) {
              const montoPagado = reserva.pagos[i].monto;

              if (montoPagado >= montoArembolsar) {
                // Realizar reembolso completo
                var status = await refund_payment(reserva.pagos[i].captureId,await get_access_token(),montoArembolsar);
                reserva.reembolsos.push({reembolsoId: status.id, monto: montoArembolsar});
                console.log(`Reembolso del pago #${reserva.pagos[i].captureId} `,status.status,` monto: ${montoArembolsar}`);
                montoArembolsar = 0;
              } else {
                // Realizar reembolso parcial
                var status = await refund_payment(reserva.pagos[i].captureId,await get_access_token(),montoPagado);
                reserva.reembolsos.push({reembolsoId: status.id,monto: montoPagado});
                montoArembolsar -= montoPagado;
                console.log( `Reembolso del pago #${i} `, status.status, ` monto: ${montoPagado}`);
              }
              // Incrementar el índice
              i++;
            }

            reserva.precioTotal = precioTotal_new;
            console.log(`Monto total de rembolso: ${precioTotal_old - precioTotal_new}  `, `status: `, status.status);
            // return res.status(200).send({ message: "Reembolso realizado con éxito" });
            break;

          case precioTotal_new === precioTotal_old:
            console.log("El monto a pagar es igual que el monto pagado");
            console.log("No hay que pagar ni reembolsar");
            // return res.status(200).send({ message: "No hay cambios en el monto a pagar" });
            break;

          default:
            return res.status(400).send({ message: "Error al procesar la solicitud" });
        }
            // Actualizar la reserva
            // reserva.nombreCliente = req.body.nombreCliente;
            // reserva.numeroContacto = req.body.numeroContacto;
            // reserva.correoElectronico = req.body.correoElectronico;
            
            //reserva.fechaInicio = new Date(req.body.fechaInicio);
            //reserva.fechaFin = new Date(req.body.fechaFin);
            //reserva.precioTotal = req.body.precioTotal;
            //reserva.habitaciones = req.body.habitaciones;

            
            // Guardar los cambios en la base de datos
            await reserva.save();

            // Eliminar los documentos de disponibilidad asociados a la reserva anterior
            Disponibilidad.findByIdAndDelete({reservaId: reserva._id});

            //Para cada habitacion de la nueva reserva, crear una documento de disponibilidad

            // for (let habitacion of req.body.habitaciones) {
            //   //Creamos un documento de disponibilidad
            //   var disponibilidad = new Disponibilidad({
            //     fechaInicio: new Date(req.body.fechaInicio),
            //     fechaFin: new Date(req.body.fechaFin),
            //     habitacionId: habitacion.habitacionId,
            //     reservaId: reserva._id,
            //   });
      
            //   //Guardamos el documento de disponibilidad en la base de datos
            //   await disponibilidad.save();
            // }

            return res.status(200).send({ message: "Reserva actualizada con éxito" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Error al procesar la solicitud" });
    }
  },
    buscarReserva: async function (req, res) {
        try {
            let reservaId = req.params.id;
        
            if (!mongoose.Types.ObjectId.isValid(reservaId)) {
                return res.status(400).send('Error: ' + reservaId + ' is not a valid reservation id.');
              } else {
                let reserva = await Reserva.findById(reservaId);

                if (!reserva) {
                    return res.status(404).send('La reserva no existe');
                }

                return res.status(200).send(reserva._id);
              }
        } catch (error) {
            console.log(err);
            return res.status(500).send(err);    
        }
    },
    detalleReserva : async function (req, res) {
        try {
            let reservaId = req.params.id;
        
            let reserva = await Reserva.findById(reservaId);

            return res.status(200).send(reserva);
        } catch (error) {
            console.log(err);
            return res.status(500).send(err);    
        }
    
    },
    obtenerHabitacion: async function (req, res) {
        try {
            let habitacionId = req.params.id;
        
            let habitacion = await Habitacion.findById(habitacionId);

            return res.status(200).send(habitacion);
        } catch (error) {
            console.log(err);
            return res.status(500).send(err);    
        }
    },
    checkDisponibilidad : async function(req, res) {
      try {
          let habitaciones = req.body.habitaciones;
          let fechaInicio = req.body.fechaInicio;
          let fechaFin = req.body.fechaFin;
          let reservaId = req.body.reservaId;

          let diponibilidad = true;

          //Obtener las habitaciones desde el frontend
          

          //Objeto para contar la cantidad de habitaciones de cada tipo
          let conteo = {};

          //Contar la cantidad de habitaciones de cada tipo
          habitaciones.forEach(function (habitacion) {
            if (conteo[habitacion.habitacionId]) {
              conteo[habitacion.habitacionId] += 1;
            } else {
              conteo[habitacion.habitacionId] = 1;
            }
          });

          //Convertir el objeto conteo a un array
          let conteoArray = Object.keys(conteo).map(function (id) {
            return { habitacionId: id, cantidad: conteo[id] };
          });

          //Recorrer el array de conteoArray para verificar si hay suficientes habitaciones disponibles
          for (let habitacion of conteoArray) {
            //encontrar los documentos en la colección de disponibilidades que se superponen
            // o chocan con las fechas deseadas
            let fechasSuperpuestas = await Disponibilidad.find({
              habitacionId: habitacion.habitacionId,
              fechaInicio: { $lt: new Date(fechaFin) },
              fechaFin: { $gt: new Date(fechaInicio) },
              reservaId: { $ne: reservaId },//Se excluye la reserva actual
            });

            //Calcular el total de habitaciones con id = habitacionId que estan reservadas en las fechas deseadas
            let totalRoomsReserved = fechasSuperpuestas.reduce(
              (total, disponibilidad) => total + disponibilidad.cantidad,
              0
            );

            //Obtener el numero total de habitaciones del tipo habitacionId
            let room = await Habitacion.findById(habitacion.habitacionId);
            let totalRooms = room.totalRooms;

            //Comprobar si hay suficientes habitaciones disponibles
            if (totalRoomsReserved + habitacion.cantidad > totalRooms) {
              return res
                .status(400)
                .send(
                  "No hay suficientes habitaciones para actualizar la reserva!"
                );
            }

            return res.status(200).send("");
          }
      } catch (err) {
          // Handle the error
          res.status(500).send('Error: ' + err);
          console.log(err);
      }
  },
  reembolsoReserva: async function (req, res) {
    try {
      let reembolso = req.body.reembolso; // El monto total a reembolsar
      let reserva = req.body.reserva; // Esta es tu reserva actual

      // Ordena los pagos en orden inverso para reembolsar los pagos más recientes primero
      reserva.pagos.sort((a, b) => b.fecha - a.fecha);

      let montoReembolsadoTotal = 0; // Variable para rastrear el monto total reembolsado

      for (let pago of reserva.pagos) {
        if (reembolso <= 0) {
          break; // Si ya hemos reembolsado el monto total, salimos del bucle
        }

        let montoReembolsado = reserva.reembolsos.find(r => r.captureId === pago.captureId)?.monto || 0; // Cuánto hemos reembolsado de esta captura
        let montoDisponible = pago.monto - montoReembolsado; // Cuánto podemos reembolsar de esta captura

        if (montoDisponible <= 0) {
          continue; // Si no hay fondos disponibles para reembolsar, pasamos a la siguiente iteración del bucle
        }

        let montoReembolso = Math.min(reembolso, montoDisponible); // No podemos reembolsar más de lo que se pagó en cada captura

        // Aquí emitirías el reembolso a través de la API de PayPal usando pago.captureId y montoReembolso
        const accessToken = await get_access_token();
        const status = await refund_payment(pago.captureId, accessToken, montoReembolso);

        let reembolsoExistente = reserva.reembolsos.find(r => r.captureId === pago.captureId);
        if (reembolsoExistente) {
          reembolsoExistente.monto += montoReembolso; // Actualizamos el monto que hemos reembolsado de esta captura
        } else {
          reserva.reembolsos.push({ captureId: pago.captureId, monto: montoReembolso }); // Agregamos un nuevo reembolso si no existía uno para esta captura
        }

        montoReembolsadoTotal += montoReembolso; // Actualizamos el monto total reembolsado
        reembolso -= montoReembolso; // Restamos el monto que acabamos de reembolsar del total restante
      }

      // Actualizamos el monto total reembolsado en la reserva
      reserva.montoReembolsado = montoReembolsadoTotal;

      // Aquí guardarías la reserva actualizada en tu base de datos
      await Reserva.findByIdAndUpdate(reserva._id, reserva, { new: true });

      return res.status(200).json({ message: 'Reembolso procesado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al procesar el reembolso' });
    }
  },
  updateReserva: async function (req, res) {
    try {
      let reserva = req.body
      // Aquí guardarías la reserva actualizada en tu base de datos
      await Reserva.findByIdAndUpdate(reserva._id, reserva, { new: true });

      // Eliminar los documentos de disponibilidad asociados a la reserva
      await Disponibilidad.deleteMany({reservaId: reserva._id});

      //Para cada habitacion de la reserva, crear una documento de disponibilidad
      for (let habitacion of reserva.habitaciones) {
        //Creamos un documento de disponibilidad
        var disponibilidad = new Disponibilidad({
          fechaInicio: new Date(reserva.fechaInicio),
          fechaFin: new Date(reserva.fechaFin),
          habitacionId: habitacion.habitacionId,
          reservaId: reserva._id,
        });

        //Guardamos el documento de disponibilidad en la base de datos
        await disponibilidad.save();
      }

      return res.status(200).json({ message: 'actualizacion correcta' });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al procesar la actualizacion de la reserva' });
    }
  },
  deleteReserva : async function (req, res) {
    try {

      let reservaId = req.params.id;
      let reserva = await Reserva.findById(reservaId);
      let reembolso = reserva.precioTotal;
      // Ordena los pagos en orden inverso para reembolsar los pagos más recientes primero
      reserva.pagos.sort((a, b) => b.fecha - a.fecha);

      let montoReembolsadoTotal = 0; // Variable para rastrear el monto total reembolsado

      for (let pago of reserva.pagos) {
        if (reembolso <= 0) {
          break; // Si ya hemos reembolsado el monto total, salimos del bucle
        }

        let montoReembolsado = reserva.reembolsos.find(r => r.captureId === pago.captureId)?.monto || 0; // Cuánto hemos reembolsado de esta captura
        let montoDisponible = pago.monto - montoReembolsado; // Cuánto podemos reembolsar de esta captura

        if (montoDisponible <= 0) {
          continue; // Si no hay fondos disponibles para reembolsar, pasamos a la siguiente iteración del bucle
        }

        let montoReembolso = Math.min(reembolso, montoDisponible); // No podemos reembolsar más de lo que se pagó en cada captura

        // Aquí emitirías el reembolso a través de la API de PayPal usando pago.captureId y montoReembolso
        const accessToken = await get_access_token();
        const status = await refund_payment(pago.captureId, accessToken, montoReembolso);

        let reembolsoExistente = reserva.reembolsos.find(r => r.captureId === pago.captureId);
        if (reembolsoExistente) {
          reembolsoExistente.monto += montoReembolso; // Actualizamos el monto que hemos reembolsado de esta captura
        } else {
          reserva.reembolsos.push({ captureId: pago.captureId, monto: montoReembolso }); // Agregamos un nuevo reembolso si no existía uno para esta captura
        }

        montoReembolsadoTotal += montoReembolso; // Actualizamos el monto total reembolsado
        reembolso -= montoReembolso; // Restamos el monto que acabamos de reembolsar del total restante
      }

      // Eliminar los documentos de disponibilidad asociados a la reserva
      await Disponibilidad.deleteMany({reservaId: reserva._id});

      // Eliminar la reserva de la base de datos
      await Reserva.findByIdAndDelete(reserva._id);      
      return res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  
  }
};

//exportar el modulo controller para que pueda ser utilizado en otros archivos
module.exports = controller;