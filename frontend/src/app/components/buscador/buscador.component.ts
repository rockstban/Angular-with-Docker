import { Component } from '@angular/core';
import { HabitacionHuespedes } from '../../models/habitacion-huespedes';
import { BusquedaBackendService } from '../../services/busqueda-backend.service';
import { Habitacion } from '../../models/habitacion';
import { Consulta } from '../../models/consulta';
import { MessageService } from 'primeng/api';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { lastValueFrom } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { GuardarEstadoService } from '../../services/guardar-estado.service';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {

  rangoFechas: Date[]; // Rango de fechas seleccionadas del calendario
  fechaMin: Date; //fecha minima para el caledario
  fechaMax: Date; //fecha maxima para el calendario
  fechaInvalida: boolean = false; //Para determinar si el rango de fechas es valido
  visible: boolean = false; //mostra el dialogo para seleccionar las habitaciones y huespedes
  totalHabitaciones: number = 0; //Total de habitaciones configuradas por el cliente
  totalHuespedes: number = 0; //Total de huespedes

  //variable para almacenar las habitaciones y huespedes,
  //por defecto se configura una habitacion con un adulto
  habitaciones: HabitacionHuespedes[] = [
    {label: 'Habitación 1', adultos: 1, ninos: 0},
  ];

  consultas: Consulta[] = []; //para guardar las consulta del cliente
  respuestas: Habitacion[][] = []; //para guardar las respuestas del backend
  items: MenuItem[] = [];//para el menu de pasos del componente resultados
  habitacionesSeleccionadas: (Habitacion | null)[] = [];//para guardar las habitaciones seleccionadas en el componente resultados

  botonBuscar = false;//para desactivar el boton de buscar habitaciones


  constructor(
    private messageService: MessageService, //para mostrar mensajes
    private busquedaService: BusquedaBackendService, //para hacer peticiones al backend
    private datosCompartidosService: DatosCompartidosService, //para compartir datos al componente de resultados
    private router: Router, //para navegar a la pagina de resultados
    private stateService: GuardarEstadoService//para limpiar el estado del componente resultados
  ){
    //setear un rango de fechas por defecto
    let diaActual = new Date();
    let diaSiguiente = new Date();
    diaSiguiente.setDate(diaActual.getDate() + 1);
    this.rangoFechas = [diaActual, diaSiguiente];

    //Establecer la fecha minima y maxima para el calendario
    this.fechaMin = new Date();
    this.fechaMax = new Date();
    this.fechaMax.setDate(this.fechaMax.getDate() + 30);//

  }

  ngOnInit() {
    this.totalHabitacionesHuespedes();
    this.habitacionesHuespedesAConsultas();
  }

  //Funcion para que la fecha del checkout sea como maximo
  //30 dias despues de la fecha del checkin
  actualizacionFechas(): void {
    // console.log(this.rangoFechas);
    if (this.rangoFechas && this.rangoFechas.length > 0) {
      this.fechaMax = new Date(this.rangoFechas[0]);
      this.fechaMax.setDate(this.fechaMax.getDate() + 30);
    }
  }

  //funcion para mostrar el dialogo para seleccionar las habitaciones y huespedes
  mostrarDialogo() {
    this.visible = true;
  }

  //funcion para contabilizar el total de habitaciones y huespedes
  totalHabitacionesHuespedes() {
    this.totalHabitaciones = this.habitaciones.length;
    this.totalHuespedes = this.habitaciones.reduce((total, habitacion) => total + habitacion.adultos + habitacion.ninos, 0);
  }

  //funcion para añadir una habitacion en el dialogo
  agregarHabitacion() {
    if (this.habitaciones.length < 4){
      this.habitaciones.push({label: `Habitación ${this.habitaciones.length + 1}`, adultos: 1, ninos: 0});
      this.totalHabitacionesHuespedes();
    }
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

  //funcion para transformar las habitaciones y huespedes en un arreglo de consultas
  habitacionesHuespedesAConsultas() {
    this.consultas = [];
    // console.log(this.habitaciones);
    for (let i = 0; i < this.habitaciones.length; i++) {
      var consulta = new Consulta();
      consulta.huespedes = this.habitaciones[i].adultos + this.habitaciones[i].ninos;
      consulta.fechaInicio = this.rangoFechas[0];
      consulta.fechaFin = this.rangoFechas[1];
      this.consultas.push(consulta);
    }
    // console.log(this.consultas);
  }

  //funcion para enviar las consultas al backend y recibir respuestas
  async buscarHabitaciones() {

    this.botonBuscar = true;

    let habitacionesHuespedes = this.habitaciones.slice();

    this.habitacionesHuespedesAConsultas();


    //Para ver si la fecha de checkin es igual a la fecha de checkout
    let fechaCheckin = new Date(this.rangoFechas[0]);
    let fechaCheckout = new Date(this.rangoFechas[1]);
    fechaCheckin.setHours(0, 0, 0, 0);
    fechaCheckout.setHours(0, 0, 0, 0);

    if (this.fechaInvalida) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Por favor, seleccione un rango de fechas válido.'});
      this.botonBuscar = false;
      return;
    } else if(fechaCheckin.getTime() === fechaCheckout.getTime()){
      this.messageService.add({severity:'error', summary:'Error', detail:'La fecha de Check-in no puede ser igual a la fecha de Check-out.'});
      this.botonBuscar = false;
      return;

    }

    this.stateService.clearState('resultadosComponentState');//limpiar el estado del componente resultados
    this.datosCompartidosService.cargando.next(true);//mostrar el spinner de carga en el componente resultados
    
    this.router.navigate(['/resultados']);//navegar al componente de resultados
    
    this.respuestas = [];
    this.items = [];
    this.habitacionesSeleccionadas = [];

    //enviar las consultas al backend y recibir las respuestas
    for (let index = 0; index < this.consultas.length; index++) {
      try {
        const response = await lastValueFrom(this.busquedaService.searchRooms(this.consultas[index]));
        if(response.habitaciones){
          this.respuestas[index] = response.habitaciones;
          this.items.push({label: `Habitación ${index + 1}`});
          this.habitacionesSeleccionadas.push(null);
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.botonBuscar = false;
    
    this.datosCompartidosService.actualizarResultadosBusqueda(this.respuestas);//compartir las respuestas
    this.datosCompartidosService.items.next(this.items);//compartir los items del menu de pasos
    this.datosCompartidosService.habitacionesSeleccionadas.next(this.habitacionesSeleccionadas);//compartir las habitaciones seleccionadas
    this.datosCompartidosService.actualizarHabitaciones(habitacionesHuespedes)//compartir las habitaciones
    this.datosCompartidosService.consulta.next(this.consultas[0]);//compartir la consulta
    this.datosCompartidosService.cargandoIngresoDatosCliente.next(true);//mostrar el spinner de carga en el componente ingreso-datos-cliente
    // console.log(this.respuestas);
  }

  //funcion para validar el rango de fechas
  validarFechas() {
    if (!this.rangoFechas || this.rangoFechas.length !== 2 || !this.rangoFechas[0] || !this.rangoFechas[1]) {
      this.fechaInvalida = true;
    } else {
      this.fechaInvalida = false;
    }
  }



}
