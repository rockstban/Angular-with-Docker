import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';

@Component({
  selector: 'app-ubicacion-contacto',
  templateUrl: './ubicacion-contacto.component.html',
  styleUrl: './ubicacion-contacto.component.css'
})
export class UbicacionContactoComponent {
  constructor(private datosCompartidosService: DatosCompartidosService) {
    this.datosCompartidosService.esconderBuscador.next(false);
    this.datosCompartidosService.esconderFooter.next(false);
  }
}
