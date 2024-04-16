import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';
import { firstValueFrom } from 'rxjs';
import { Habitacion } from '../../models/habitacion';
import { Global } from '../../services/global';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Event, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-detalles-reserva',
  templateUrl: './detalles-reserva.component.html',
  styleUrl: './detalles-reserva.component.css'
})
export class DetallesReservaComponent {
  
  //Obtener el número de noches de la reserva
  noches: number = 0;

  habitaciones: Habitacion[] = [];//Habitaciones de la reserva

  mostrarDatos: boolean = false;//Para mostrar los datos de la reserva

  visible_modal: boolean = false;//Para mostrar el modal de detalles de la habitación

  //Para mostrar los detalles de la habitación en el modal
  modal_room: Habitacion=new Habitacion( '', [], '', 0, 0, 0, 0, 0, false, 0, {facilidadesAcceso: [], bano: [], habitacion: [], entretenimiento: [], alimentosBebidas: [], internet: [], mas: []});

  reserva: Reserva;//Para guardar los datos de la reserva

  public url: string;//Para asignar la url del backend

  checkIn: Date = new Date();//Para guardar la fecha de entrada

  checkOut: Date = new Date();//Para guardar la fecha de salida

  checkInNumMes: string = "";//Para guardar el número de día del mes de la fecha de entrada
  checkOutNumMes: string = "";//Para guardar el número de día del mes de la fecha de salida

  checkInMes: string = "";//Para guardar el mes de la fecha de entrada
  checkOutMes: string = "";//Para guardar el mes de la fecha de salida

  checkInDia: string = "";//Para guardar el día de la semana de la fecha de entrada
  checkOutDia: string = "";//Para guardar el día de la semana de la fecha de salida

  totalAdultos: number = 0;//Para guardar el total de adultos de la reserva
  totalNinos: number = 0;//Para guardar el total de niños de la reserva

  limiteParaCancelar: Date = new Date();//Para guardar la fecha límite para cancelar la reserva
  limiteParaCancelarFormat: string = "";//Para guardar la fecha límite para cancelar la reserva en formato de texto
  fechaactual: Date = new Date();//Para guardar la fecha actual
  cargando: boolean = true;//Para mostrar el spinner de carga

  mensajeSuccess: string = "";//Para mostrar mensaje de éxito

  private previousUrl: string="";
  private currentUrl: string="";
  

  constructor(
    private datosCompartidosService: DatosCompartidosService,//Servicio para compartir datos entre componentes
    private router: Router,//Servicio para redireccionar a otras rutas
    private activatedRoute: ActivatedRoute,//Servicio para obtener la ruta activa
    private reservaService: ReservaService,//Servicio para obtener los datos de la reserva
    private messageService: MessageService,//Servicio para mostrar mensajes
    ) {
    this.reserva = new Reserva("","","","",new Date(),new Date(),0,[],[],[]);
    this.datosCompartidosService.esconderBuscador.next(true);
    this.url = Global.url;//Asignar la url del backend
    this.datosCompartidosService.esconderFooter.next(true);
    
  }

   ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      let id = params['id'];
      await this.detallesReserva(id);
      //console.log(this.reserva);

      for(let i = 0; i < this.reserva.habitaciones.length; i++){
        await this.obtenerHabitacion(this.reserva.habitaciones[i].habitacionId,i);
      }
      
      this.mostrarDatos = true;

      //Obtener el número de noches de la reserva
      this.checkIn = new Date(this.reserva.fechaInicio);
      this.checkOut = new Date(this.reserva.fechaFin);
      let diferencia = this.checkOut.getTime() - this.checkIn.getTime();
      this.noches = Math.round(diferencia / (1000 * 3600 * 24));

      //Obtener la fecha de check-in y check-out en formato de texto
      this.checkInNumMes = format(this.checkIn, "d", {locale: es}).toUpperCase();
      this.checkOutNumMes = format(this.checkOut, "d", {locale: es}).toUpperCase();

      this.checkInMes = format(this.checkIn, "MMM", {locale: es}).toUpperCase();
      this.checkOutMes = format(this.checkOut, "MMM", {locale: es}).toUpperCase();

      this.checkInDia = format(this.checkIn, "EEE", {locale: es}).toUpperCase();
      this.checkOutDia = format(this.checkOut, "EEE", {locale: es}).toUpperCase();
      
      //Obtenemos el total de adultos y niños de la reserva
      this.totalAdultos = this.reserva.habitaciones.reduce((suma, habitacion) => suma + habitacion.adultos, 0);
      this.totalNinos = this.reserva.habitaciones.reduce((suma, habitacion) => suma + habitacion.ninos, 0);

      //Obtener la fecha límite para cancelar la reserva
      this.limiteParaCancelar = new Date(this.checkIn.getTime());
      this.limiteParaCancelar.setDate(this.checkIn.getDate() - 2);
      this.limiteParaCancelar.setHours(23,59,59,999);
      this.limiteParaCancelarFormat = this.limiteParaCancelar.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

      this.cargando = false;
      this.datosCompartidosService.esconderFooter.next(false);
    });


   }


    //Método para obtener los detalles de la reserva
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
        this.habitaciones[index] = habitacion;
      } catch (error) {
        console.log(error);
      }
    }
    async eliminarReserva(id: string) {
      this.cargando = true;
      try {
        let response = await firstValueFrom(this.reservaService.eliminarReserva(id));
        console.log(response.message);
        
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
      this.router.navigate(['/DetallesReserva']);
    }
    confirm_eliminar(id: string){

        console.log(`Eliminando reserva con id: ${id}`);
        //this.eliminarReserva(id)
        this.deleteReserva();      
    }

    visible(room: Habitacion){
      this.visible_modal = true;
      this.modal_room = room;
      //console.log(this.modal_room);
  
    }

    modificarReserva(){
      this.router.navigate(['/modificar-reserva', this.reserva._id]);
    }

    async deleteReserva(){
      this.cargando = true;
      try {
        let response = await firstValueFrom(this.reservaService.deleteReserva(this.reserva._id));
        console.log(response.message);
        
      } catch (error) {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al eliminar la reserva'});
      }
      this.cargando = false;
      this.messageService.add({severity:'success', summary: 'Reserva eliminada', detail: 'La reserva ha sido eliminada con éxito'});
      this.router.navigate(['/about-us']);
      
    }


   
}


