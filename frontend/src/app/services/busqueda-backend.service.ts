import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../services/global';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class BusquedaBackendService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
   }

  searchRooms(busqueda: Consulta): Observable<any> {
    // Realizar la solicitud al backend utilizando HttpClient
    let params = JSON.stringify(busqueda);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'obtener-habitaciones', params, {headers: headers}); 
  }
}
