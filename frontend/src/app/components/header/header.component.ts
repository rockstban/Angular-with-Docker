import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private datosCompartidosService: DatosCompartidosService
  ) {

  }


  buscarReserva(){
    this.router.navigate(['/buscar-reserva']);
  }

  sobreNosotros(){
    this.router.navigate(['/about-us']);
  }

  nuestrosServicios(){
    this.router.navigate(['/nuestros-servicios']);
  }

  galeriaFotos(){
    this.router.navigate(['/galeria-imagenes']);
  }

  ubicacionContacto(){
    this.router.navigate(['/ubicacion-contacto']);
  }

  
}



