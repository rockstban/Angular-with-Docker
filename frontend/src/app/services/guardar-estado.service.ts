import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardarEstadoService {

  private state = new Map<string, any>();//Para guardar el estado
  

  constructor() { }

  //Para guardar un valor en el estado
  set(key: string, value: any) {
    this.state.set(key, value);
  }

  //Para obtener un valor del estado
  get(key: string) {
    return this.state.get(key);
  }

  clearState(key: string) {
    this.state.delete(key);
  }
}
