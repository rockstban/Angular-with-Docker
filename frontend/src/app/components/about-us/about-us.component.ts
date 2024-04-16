import { Component } from '@angular/core';

import { DatosCompartidosService } from '../../services/datos-compartidos.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  constructor(
    private datosCompartidosService: DatosCompartidosService
  ){
    this.datosCompartidosService.esconderBuscador.next(false);
    this.datosCompartidosService.esconderFooter.next(false);
  }

}
