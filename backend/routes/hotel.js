'use strict'
var express = require('express');//Cargar el modulo de express
var HotelContoller = require('../controllers/hotel')//Cargar el controlador del hotel
var router = express.Router();//Cargar el modulo de express para crear rutas

// ** Rutas de la aplicacion **
//Home
router.get('/', HotelContoller.home);

//Obtener las habitaciones disponibles en base a las fechas de checkin y checkout
router.post('/obtener-habitaciones', HotelContoller.obtenerHabitaciones);

//Obtener la imagen de una habitacion
router.get('/obtener-imagen/:imagen', HotelContoller.obtenerImagen);

//Crear una orden de PayPal
router.post('/crear_orden', HotelContoller.crearOrden);

//Completar una orden de PayPal
router.post('/completar_orden', HotelContoller.completarOrden);

//Crear una reserva
router.post('/crear_reserva', HotelContoller.crearReserva);

//Eliminar una reserva
router.delete('/eliminar_reserva/:id', HotelContoller.eliminarReserva);

//Buscar una reserva
//router.post('/buscar_reserva/:id', HotelContoller.buscarReserva);

//modificar una reserva
router.put('/modificar_reserva/:id', HotelContoller.modificarReserva);
//Exportar el modulo router para que pueda ser utilizado en otros archivos

//buscar una reserva
router.post('/buscar_reserva/:id', HotelContoller.buscarReserva);

//Detalle de una reserva
router.post('/detalle_reserva/:id', HotelContoller.detalleReserva);

//Obtener habitacion por id
router.post('/obtener_habitacion/:id', HotelContoller.obtenerHabitacion);
module.exports = router;

//Verificar disponibilidad de habitaciones
router.post('/verificar_disponibilidad', HotelContoller.checkDisponibilidad);

//Realizar un reembolso y actualizar la reserva
router.put('/reembolso_reserva', HotelContoller.reembolsoReserva);

//Realizar un pago y actualizar la reserva, o actulizar solo fechas
router.put('/update_reserva', HotelContoller.updateReserva);

//delete reserva
router.delete('/delete_reserva/:id', HotelContoller.deleteReserva);