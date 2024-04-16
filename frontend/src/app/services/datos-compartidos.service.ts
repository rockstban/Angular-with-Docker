import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { HabitacionHuespedes } from '../models/habitacion-huespedes';
import { Consulta } from '../models/consulta';
import { Habitacion } from '../models/habitacion';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  private resultadosBusqueda = new BehaviorSubject<any>(null);//para compartir los resultados de la busqueda
  resultadosCompartidos = this.resultadosBusqueda.asObservable();

  cargando = new BehaviorSubject<boolean>(false);//para mostrar el spinner de carga

  items = new BehaviorSubject<MenuItem[]>([]);//para compartir los items del menu de pasos

  //habitacionHuespedes = new BehaviorSubject<any>(null);//para compartir las habitaciones y huespedes

  habitacionesSeleccionadas = new BehaviorSubject<(Habitacion|null)[]>([]);//para compartir las habitaciones seleccionadas

  private habitaciones = new BehaviorSubject<HabitacionHuespedes[]>([]);//para compartir las habitaciones
  habitacionesCompartidas = this.habitaciones.asObservable();

  consulta = new BehaviorSubject<Consulta>(new Consulta());//para compartir la consulta

  habitacionesSeleccionadasCliente = new BehaviorSubject<Habitacion[]>([]);//para compartir las habitaciones seleccionadas por el cliente

  cargandoIngresoDatosCliente = new BehaviorSubject<boolean>(true);//para mostrar el spinner de carga

  esconderBuscador = new BehaviorSubject<boolean>(false);//para esconder el buscador

  esconderFooter = new BehaviorSubject<boolean>(false);//para esconder el buscador

  mensajeSuccess = new BehaviorSubject<string>('');//para mostrar mensaje de exito


  constructor() {


   }

  actualizarResultadosBusqueda(datosNuevos: any) {
    this.resultadosBusqueda.next(datosNuevos);
  }

  actualizarHabitaciones(datosNUevos: any){
    this.habitaciones.next(datosNUevos);
  }

  //funcion para obtener las noche entre dos fechas
  obtenerNoches(fechaInicio: Date, fechaFin: Date) {
    let diferencia = fechaFin.getTime() - fechaInicio.getTime();
    let diferenciaEnDias = Math.round(diferencia / (1000 * 60 * 60 * 24));
    return Math.floor(diferenciaEnDias);
  }


}
