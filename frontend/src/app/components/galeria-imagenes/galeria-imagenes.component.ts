import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { Galeria } from '../../models/galeria';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';

@Component({
  selector: 'app-galeria-imagenes',
  templateUrl: './galeria-imagenes.component.html',
  styleUrl: './galeria-imagenes.component.css'
})
export class GaleriaImagenesComponent {

  constructor(
    private galeriaDialog: DialogService,
    private datosCompartidosService: DatosCompartidosService
    ) {
      this.datosCompartidosService.esconderBuscador.next(false);
      this.datosCompartidosService.esconderFooter.next(false);
     }

  cards: Galeria[] = [
    { nombre: 'Habitaciones de lujo', imgSrc: '../../../assets/img/dormitorio1.jpg', alt: 'Imagen 1', rating: '****',
   des: 'Habitaciones elegantemente decoradas cuentan con una cama King y un área de trabajo independiente'},
   { nombre: 'Habitaciones ejecutivas', imgSrc: '../../../assets/img/dormitorio2.webp', alt: 'Imagen 2', rating: '****',
   des: 'Diseñadas para satisfacer las necesidades de los viajeros más exigentes, estas habitaciones ofrecen una experiencia única que combina lujo moderno, funcionalidad y vistas impresionantes.'},
   { nombre: 'Habitaciones clásicas', imgSrc: '../../../assets/img/dormitorio3.jpg', alt: 'Imagen 3', rating: '****',
   des: 'Detalles cuidadosamente seleccionados y un diseño acogedor, estas habitaciones encarnan la sofisticación clásica que define la hospitalidad de nuestro hotel'},
   { nombre: 'Habitaciones ejecutivas con 2 camas', imgSrc: '../../../assets/img/dormitorio5.jpg', alt: 'Imagen 4', rating: '****',
   des: 'Diseñadas para satisfacer las necesidades de los viajeros de negocios o grupos pequeños, estas habitaciones ofrecen una experiencia excepcional donde el estilo y el espacio se encuentran.'},
   { nombre: 'Habitaciones Junior con 2 camas', imgSrc: '../../../assets/img/dormitorio6.jpg', alt: 'Imagen 4', rating: '****',
   des: 'Diseñadas para aquellos que buscan un alojamiento más amplio y versátil, estas habitaciones ofrecen una experiencia única que combina estilo moderno y detalles encantadores.'},
   { nombre: 'Suites ejecutivas', imgSrc: '../../../assets/img/dormitorio4.jpg', alt: 'Imagen 5', rating: '****',
   des: 'Diseñadas para satisfacer las necesidades de los huéspedes más exigentes, estas suites ofrecen un ambiente refinado con detalles cuidadosamente seleccionados y servicios exclusivos'},
  ];

  moverColumna(direccion: 'izquierda' | 'derecha') {
    if (direccion === 'izquierda') {
      // Mueve la última card al principio del arreglo
      const ultimaCard = this.cards.pop();
      if (ultimaCard) {
        this.cards.unshift(ultimaCard);
      }
    } else {
      // Mueve la primera card al final del arreglo
      const primeraCard = this.cards.shift();
      if (primeraCard) {
        this.cards.push(primeraCard);
      }
    }
  }

  abrirGaleriaDialog(galeria: Galeria) {
    this.galeriaDialog.abrirDialogGaleria(galeria);
  }
}