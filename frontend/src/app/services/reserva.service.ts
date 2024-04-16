import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { Global } from '../services/global';
import { Disponibilidad } from '../models/diponibilidad';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  public url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = Global.url;
  }

  //metodo para crear una reserva
  crearReserva(reserva: Reserva): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(reserva);
    return this.http.post(this.url + 'crear_reserva',params, {headers: headers});
  }

  //Buscar una reserva por id
  buscarReserva(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'buscar_reserva/' + id, {headers: headers});
  }

  //Detalles de una reserva
  detallesReserva(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'detalle_reserva/' + id, {headers: headers});
  }

  //Obtener habitación
  obtenerHabitacion(id: string): Observable<any> {
    // Realizar la solicitud al backend utilizando HttpClient
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'obtener_habitacion/' + id, {headers: headers}); 
  }

  //eliminar reserva
  eliminarReserva(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'eliminar_reserva/' + id, {headers: headers});
  }

  //modificar reserva
  modificarReserva(reserva: Reserva): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(reserva);
    return this.http.put(this.url + 'modificar_reserva/' + reserva._id, params, {headers: headers});
  }

  verificarDisponibilidad(disponibilidad: Disponibilidad): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(disponibilidad);
    return this.http.post(this.url + 'verificar_disponibilidad', params, {headers: headers});
  }

  //modificar reserva
  reembolsoReserva(reserva: Reserva, reembolso: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(
      {
        reserva: reserva,
        reembolso: reembolso
      }
    );
    return this.http.put(this.url + 'reembolso_reserva', params, {headers: headers});
  }

  //metodo para crear una reserva
  updateReserva(reserva: Reserva): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(reserva);
    return this.http.put(this.url + 'update_reserva',params, {headers: headers});
  }

  //delete reserva
  deleteReserva(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'delete_reserva/' + id, {headers: headers});
  }

  
}
