import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ReservaService } from '../../services/reserva.service';
import { Pago, Reserva } from '../../models/reserva';
import { Router, ActivatedRoute } from '@angular/router';
import { Habitacion } from '../../models/habitacion';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { format } from 'date-fns';
import { es, hu } from 'date-fns/locale';
import { HabitacionHuespedes } from '../../models/habitacion-huespedes';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Disponibilidad } from '../../models/diponibilidad';
import { PaypalService } from '../../services/paypal.service';

declare var paypal: any;// Se declara la variable paypal para acceder al SDK de JavaScript de PayPal

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrl: './modificar-reserva.component.css'
})
export class ModificarReservaComponent {
  //ID de cliente de PayPal
  private client_id = "AUXE302XOsSiQU2cKmPZY5Amu2ilBXeOxX0-mc73MP0YQcWGcsPAWpT-CRe7qMJZMkxoIq_ySF7404Cp";
  private intent = "capture";//Tipo de transacción de PayPal

  reserva: Reserva;//Para guardar los datos de la reserva

  habitacionesReserva: Habitacion[] = [];//Habitaciones de la reserva

  noches: number = 0;//Obtener el número de noches de la reserva

  fechasFormat: String[] = [];//Para guardar las fechas en formato de texto

  totalHuespedes: number[] =  [];//Para guardar el total de huéspedes de la reserva

  cargando: boolean = true;//Para mostrar el spinner de carga cuando carga el componente

  cargando2: boolean = false;//Para mostrar el spinner de carga cuano se verifica la disponibilidad

  mostrarReservaActual: boolean = true;//Para mostrar la reserva actual

  rangoFechas: Date[] = [] // Rango de fechas seleccionadas del calendario

  fechasOriginales: Date[] = [];//Para guardar las fechas originales de la reserva

  fechasMinMax: Date[] = [];//Para guardar la fecha minima y maxima para el calendario

  fechaInvalida: boolean = false; //Para determinar si el rango de fechas es valido

  nuevoTotalHuespedes: number = 0;//Para guardar el nuevo total de huéspedes

  nuevoTotalHabitaciones: number = 0;//Para guardar el nuevo total de habitaciones

  visible: boolean = false; //mostra el dialogo para seleccionar las habitaciones y huespedes

  habitaciones: HabitacionHuespedes[] = [];//variable para almacenar las habitaciones y huespedes

  mostrar: number = 0;//

  fechasNuevas: Date[] = [];//Para guardar las fechas nuevas 

  fechasNuevasFormat: String[] = [];//Para guardar las fechas nuevas en formato de texto 

  consultarDisponibilidad: Disponibilidad = new Disponibilidad(new Date(), new Date(), "", []);//Para guardar los datos de la disponibilidad

  precioTotalNuevo: number = 0;//Para guardar el precio total de la reserva con las nuevas fechas

  nochesNuevas: number = 0;//Para guardar el número de noches de la reserva con las nuevas fechas

  escenarios: number[] = [0,1,2];//Para ver que escenario manejar en el método updateReserva



  constructor(
    private reservaService: ReservaService,//Servicio para obtener los datos de la reserva
    private activatedRoute: ActivatedRoute,//Servicio para obtener la ruta activa
    private datosCompartidosService: DatosCompartidosService,//Servicio para compartir datos entre componentes
    private messageService: MessageService,//Servicio para mostrar mensajes
    private paypalService: PaypalService,//Servicio de PayPal
    private router: Router//Servicio para la navegación
    ){
      this.reserva = new Reserva("","","","",new Date(),new Date(),0,[],[],[]);
      this.datosCompartidosService.esconderBuscador.next(true);
      this.datosCompartidosService.esconderFooter.next(true);

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {

      //Obtener la reserva
      let id = params['id'];
      this.detallesReserva(id);
      await this.detallesReserva(id);
      console.log(this.reserva);

      //Obtener las habitaciones de la reserva
      for(let i = 0; i < this.reserva.habitaciones.length; i++){
        await this.obtenerHabitacion(this.reserva.habitaciones[i].habitacionId,i);
      }

      //Obtener el número de noches de la reserva
      this.fechasOriginales[0] = new Date(this.reserva.fechaInicio);
      this.fechasOriginales[1] = new Date(this.reserva.fechaFin);
      let diferencia = this.fechasOriginales[1].getTime() - this.fechasOriginales[0].getTime();
      this.noches = Math.round(diferencia / (1000 * 3600 * 24));

      //Obtener la fecha de check-in y check-out en formato de texto
      this.fechasFormat[0] = format(this.fechasOriginales[0], 'EEEE, d MMM', { locale: es });
      this.fechasFormat[1] = format(this.fechasOriginales[1], 'EEEE, d MMM', { locale: es });

      //Obtener el total de huéspedes
      this.totalHuespedes[0] = this.reserva.habitaciones.reduce((suma, habitacion) => suma + habitacion.adultos, 0);
      this.totalHuespedes[1] = this.reserva.habitaciones.reduce((suma, habitacion) => suma + habitacion.ninos, 0);

      //setear un rango de fechas de la reserva
      this.rangoFechas = [new Date(this.reserva.fechaInicio), new Date(this.reserva.fechaFin)];

       //Establecer la fecha minima y maxima para el calendario
      //fechasMinMax[0] = fechaMin, fechasMinMax[1] = fechaMax
      this.fechasMinMax[0] = new Date();
      this.fechasMinMax[1] = new Date(this.reserva.fechaInicio);
      this.fechasMinMax[1].setDate(this.fechasMinMax[1].getDate() + 30);//

      //Estalecer las habitaciones totales y huespedes totales de la reserva
      this.nuevoTotalHabitaciones = this.reserva.habitaciones.length;
      this.nuevoTotalHuespedes = this.totalHuespedes[0] + this.totalHuespedes[1];

      //LLenar las habitaciones y huespedes en el dialogo
      for(let i = 0; i < this.reserva.habitaciones.length; i++){
        this.habitaciones.push({label: `Habitación ${i + 1}`, adultos: this.reserva.habitaciones[i].adultos, ninos: this.reserva.habitaciones[i].ninos});
      }

      //Llenar las habitaciones en el objeto de disponibilidad
      for(let i = 0; i < this.reserva.habitaciones.length; i++){
        this.consultarDisponibilidad.habitaciones.push({habitacionId: this.reserva.habitaciones[i].habitacionId});
      }

      this.consultarDisponibilidad.reservaId = this.reserva._id;

      //Ocultar el spinner de carga
      this.cargando = false;

      this.datosCompartidosService.esconderFooter.next(false);

    });
  }

  //Obtener una reserva
  async detallesReserva(id: string) {
    try {
      let response = await firstValueFrom(this.reservaService.detallesReserva(id));
      this.reserva = response;
      //console.log(this.reserva);
    } catch (error) {
      console.log(error);
    }
  }

  //Método para obtener una habitación por su id
  async obtenerHabitacion(id: string, index: number) {
    try {
      let habitacion = await firstValueFrom(this.reservaService.obtenerHabitacion(id));
      this.habitacionesReserva[index] = habitacion;
    } catch (error) {
      console.log(error);
    }
  }

  /*Mostrar reserva actual*/
  ocultarReservaActual(){
    if(this.mostrarReservaActual){
      this.mostrarReservaActual = false;
    } else {
      this.mostrarReservaActual = true;
    }
  }

   //Funcion para que la fecha del checkout sea como maximo
  //30 dias despues de la fecha del checkin
  actualizacionFechas(): void {
    // console.log(this.rangoFechas);
    if (this.rangoFechas && this.rangoFechas.length > 0) {
      this.fechasMinMax[1] = new Date(this.rangoFechas[0]);
      this.fechasMinMax[1].setDate(this.fechasMinMax[1].getDate() + 30);
    }
  }

  //funcion para validar el rango de fechas
  validarFechas() {
    if (!this.rangoFechas || this.rangoFechas.length !== 2 || !this.rangoFechas[0] || !this.rangoFechas[1]) {
      this.fechaInvalida = true;
    } else {
      this.fechaInvalida = false;
    }
  }

  //funcion para mostrar el dialogo para seleccionar las habitaciones y huespedes
  mostrarDialogo() {
    this.visible = true;
  }

  //funcion para eliminar habitaciones en el dialogo
  eliminarHabitacion(i: number) {
    if (this.habitaciones.length > 1) {
      this.habitaciones.splice(i, 1);
      // Actualizar las etiquetas de las habitaciones
      for (let j = 0; j < this.habitaciones.length; j++) {
        this.habitaciones[j].label = `Habitación ${j + 1}`;
      }
      this.totalHabitacionesHuespedes();
    }
  }

  //funcion para añadir una habitacion en el dialogo
  agregarHabitacion() {
    if (this.habitaciones.length < 4){
      this.habitaciones.push({label: `Habitación ${this.habitaciones.length + 1}`, adultos: 1, ninos: 0});
      this.totalHabitacionesHuespedes();
    }
  }

  //funcion para contabilizar el total de habitaciones y huespedes
  totalHabitacionesHuespedes() {
    this.nuevoTotalHabitaciones = this.habitaciones.length;
    this.nuevoTotalHuespedes = this.habitaciones.reduce((total, habitacion) => total + habitacion.adultos + habitacion.ninos, 0);
  }

  //Metodo para obtener la fecha sin las horas
  fechaSinHora(fecha: Date) {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  }

  async verDisponibilidad(indice: number){
    let message: Message | null = null;

    //Si el rango de fechas es invalido, muestra un mensaje de error
    if (this.fechaInvalida) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Por favor, seleccione un rango de fechas válido.'});
      return;
    }

    // Compara las fechas sin las horas
    if (this.fechaSinHora(this.fechasOriginales[0]).getTime() === this.fechaSinHora(this.rangoFechas[0]).getTime() && 
    this.fechaSinHora(this.fechasOriginales[1]).getTime() === this.fechaSinHora(this.rangoFechas[1]).getTime()) {
      this.messageService.add({severity:'warn', summary:'', detail:'Las fechas nuevas son iguales a las fechas actuales. Por favor, seleccione nuevas fechas.'});
      this.mostrar = 0;
      return; // Si las fechas son las mismas, termina el método aquí
    } else if(this.fechaSinHora(this.rangoFechas[0]).getTime() === this.fechaSinHora(this.rangoFechas[1]).getTime()) {
      this.messageService.add({severity:'error', summary:'', detail:'La fecha de check-in y check-out no pueden ser iguales.'});
      this.mostrar = 0;
      return; // Si las fechas son las mismas, termina el método aquí
    }
    try {
      this.cargando2 = true;
      this.mostrar = 0;
      this.consultarDisponibilidad.fechaInicio = this.rangoFechas[0];
      this.consultarDisponibilidad.fechaFin = this.rangoFechas[1];

      let response = await firstValueFrom(this.reservaService.verificarDisponibilidad(this.consultarDisponibilidad));

      this.mostrar = indice;

      //Establecer la nuevas fechas
      this.fechasNuevas[0] = this.rangoFechas[0];
      this.fechasNuevas[1] = this.rangoFechas[1];

      //Obtener la fecha de check-in y check-out en formato de texto
      this.fechasNuevasFormat[0] = format(this.fechasNuevas[0], 'EEEE, d MMM', { locale: es });
      this.fechasNuevasFormat[1] = format(this.fechasNuevas[1], 'EEEE, d MMM', { locale: es });

      //Obtener el número de noches de la reserva de las nuevas fechas
      let diferencia = this.rangoFechas[1].getTime() - this.rangoFechas[0].getTime();
      this.nochesNuevas = Math.round(diferencia / (1000 * 3600 * 24));

      this.precioTotalNuevo = this.habitacionesReserva.reduce((suma, habitacion) => suma + habitacion.precio, 0) * this.nochesNuevas;

      message = {severity:'success', summary:'', detail:'Las fechas están disponibles!'};
      this.mostrar = 1;
      if((this.precioTotalNuevo - this.reserva.precioTotal) > 0){
        this.botonPayPal(this.precioTotalNuevo);
      }
    } catch (error: any) {
      if (error.status === 400) {
        message = {severity:'error', summary:'', detail:'La nuevas fechas no estan disponibles para actualizar la estadía!'};
        this.mostrar = 0;
      } else if (error.status === 500){
        message = {severity:'error', summary:'', detail:'Hubo un error en el servidor'};
        this.mostrar = 0;
      } else {
        console.log(error);
        this.mostrar = 0;
      }
    } finally {
      this.cargando2 = false;
      if (message) {
        this.messageService.add(message);
      }
    }
    

  }

  //Obtener el valor absoluto de un número
  abs(valor: number){
    return Math.abs(valor);
  }

  //Metodo para cargar el SDK de PayPal
  //(SDK:  conjunto de bibliotecas de software que proporciona funciones para integrar los servicios de PayPal )
  loadPaypalScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');//Se crea un elemento script

      //Se le asigna la url del SDK de PayPal
      scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${this.client_id}&enable-funding=venmo&currency=USD&intent=${this.intent}`;

      //Cuando el script se carga correctamente se resuelve la promesa
      scriptElement.onload = resolve;

      //Cuando el script no se carga correctamente se rechaza la promesa
      scriptElement.onerror = reject;

      //Se agrega el script al al cuerpo del documento
      document.body.appendChild(scriptElement);
    });
  }

  botonPayPal(total: number){
    //Se carga el SDK de JavaScript de PayPal
    //y el código dentro de then se ejecuta una vez que el script de PayPal se ha cargado correctamente.
    this.loadPaypalScript().then(() => {
      paypal.Buttons({

        //Estilo del botón de PayPal
        style: {
          shape: 'pill',
          color: 'blue',
          layout: 'vertical',
          label: 'pay'
        },
        fundingSource: paypal.FUNDING.PAYPAL,//Se especifica que solo el botón de PayPal se muestre en la lista de opciones de pago
              
        //Para crear una orden de PayPal, se devuelve el ID de la orden.
        createOrder: () => {
          let diferencia = this.precioTotalNuevo - this.reserva.precioTotal;
          return this.paypalService.crearOrden('capture', diferencia).toPromise()
            .then((order) => {
              console.log(order);
              return order.id;
            });
        },
        //Para aprobar la orden de PayPal
        onApprove: (data: any) => {
          return this.paypalService.completarOrden('capture', data.orderID).toPromise()
            .then((order_details) => {
              let nuevaReserva = JSON.parse(JSON.stringify(this.reserva));
              let captureId = order_details.purchase_units[0].payments.captures[0].id;
              let diferencia = this.precioTotalNuevo - nuevaReserva.precioTotal;
              nuevaReserva.pagos.push(new Pago(captureId, diferencia, new Date()));
              nuevaReserva.fechaInicio = this.rangoFechas[0];
              nuevaReserva.fechaFin = this.rangoFechas[1];
              nuevaReserva.precioTotal = this.precioTotalNuevo;

              //Para crear la reserva en la base de datos
              this.reservaService.updateReserva(nuevaReserva).subscribe(
                response => {
                  console.log(response);
                  this.messageService.add({severity:'success', summary:'', detail:'El pago y la actualizacion de la reserva se han realizado correctamente!'});
                  this.router.navigate(['/actualizacion-exitosa', nuevaReserva._id]);
                },
                error => {
                  console.log(error);
                  this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error con el pago. Por favor, intente nuevamente.'});
                }
              );
              
            })
            .catch((error) => {
              console.log(error);
              this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error con el pago. Por favor, intente nuevamente.'});
            });
        },
        //Si el pago es cancelado
        onCancel: () => {
          console.log('¡El pago fué cancelado!');
          this.messageService.add({severity:'warn', summary:'', detail:'¡El pago fué cancelado!'});
        },
        //Si hay un error en el pago
        onError: (err: any) => {
          console.log(err);
        }
      }).render('#payment_options');//Se renderiza el botón de PayPal en el div con el id payment_options
    });
  }

  //Metodo para actualizar la reserva
  async reembolsoReserva(){
    let nuevaReserva = JSON.parse(JSON.stringify(this.reserva));
    if(this.precioTotalNuevo - nuevaReserva.precioTotal > 0){
      return
    }
    let reembolso = this.abs(this.precioTotalNuevo - nuevaReserva.precioTotal);
    let message: Message | null = null;
    let huboError = false;
    try {
      this.cargando2 = true
      nuevaReserva.fechaInicio = this.rangoFechas[0];
      nuevaReserva.fechaFin = this.rangoFechas[1];
      nuevaReserva.precioTotal = this.precioTotalNuevo;
      let response = await firstValueFrom(this.reservaService.reembolsoReserva(nuevaReserva, reembolso, ));
      console.log(response);
      message = {severity:'success', summary:'', detail:'La reserva se ha actualizado correctamente!'};
    } catch (error: any) {
      if (error.status === 400) {
        message = {severity:'error', summary:'', detail:'No se puede actualizar la reserva. Las fechas no están disponibles.'};
        huboError = true;
      } else if (error.status === 500){
        message = {severity:'error', summary:'', detail:'Hubo un error en el servidor'};
        huboError = true;
      } else {
        console.log(error);
        huboError = true;
      }
    } finally {
      this.cargando2 = false;
      if (message) {
        this.messageService.add(message);
        if (!huboError) {
          this.messageService
          this.router.navigate(['/actualizacion-exitosa', this.reserva._id]);
        }
      }
    }
  }

  async updateReserva(){
    let message: Message | null = null;
    let nuevaReserva = JSON.parse(JSON.stringify(this.reserva));
    let huboError = false;
    try {
      this.cargando2 = true;
      nuevaReserva.fechaInicio = this.rangoFechas[0];
      nuevaReserva.fechaFin = this.rangoFechas[1];
      nuevaReserva.precioTotal = this.precioTotalNuevo;
      let response = await firstValueFrom(this.reservaService.updateReserva(nuevaReserva));
      this.cargando2 = false;
      message = {severity:'success', summary:'', detail:'La reserva se ha actualizado correctamente!'};
    } catch (error: any) {
      if (error.status === 400) {
        message = {severity:'error', summary:'', detail:'No se puede actualizar la reserva.'};
        huboError = true;
      } else if (error.status === 500){
        message = {severity:'error', summary:'', detail:'Hubo un error en el servidor'};
        huboError = true;
      } else {
        console.log(error);
        huboError = true;
      }
    } finally {
      if (message) {
        this.cargando2 = false;
        if (message) {
          this.messageService.add(message);
          if (!huboError) {
            this.datosCompartidosService.mensajeSuccess.next('La reserva se ha actualizado correctamente!');
            this.router.navigate(['/actualizacion-exitosa', this.reserva._id]);
          }
        }
      }
    }
  }

  cancelarCambios(){
    this.router.navigate(['/detalles-reserva', this.reserva._id]);
  }

  

}
