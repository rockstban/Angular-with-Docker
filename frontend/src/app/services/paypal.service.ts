import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
   }

  crearOrden(intent: string, value: number): Observable<any> {
    return this.http.post(this.url + 'crear_orden', { intent: intent, value: value }, { headers: this.headers });
  }

  completarOrden(intent: string, order_id: string): Observable<any> {
    return this.http.post(this.url + 'completar_orden', { intent: intent, order_id: order_id}, { headers: this.headers });
  }
}
