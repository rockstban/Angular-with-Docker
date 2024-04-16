import { Component } from '@angular/core';
import { Servicio } from '../../models/servicio';

import { DialogService } from '../../services/dialog.service';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrl: './nuestros-servicios.component.css'
})
export class NuestrosServiciosComponent {

  services: Servicio[] = [
    {
      nombre: 'Estacionamiento gratis',
      descripcion: 'El hotel ofrece a sus huéspedes la conveniencia de un estacionamiento gratuito. Esto permite a los visitantes estacionar sus vehículos sin costo adicional, brindando comodidad y accesibilidad durante su estadía.',
      pathImagen: '../../../assets/img/servicios/estacionamiento.jpg',
      iconClass: 'fa-sharp fa-solid fa-square-parking text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Wifi gratis',
      descripcion: 'Los huéspedes pueden disfrutar de acceso gratuito a Internet inalámbrico en todas las áreas del hotel. Ya sea para trabajo o entretenimiento, la conexión WiFi gratuita permite a los visitantes mantenerse conectados y acceder a la información necesaria durante su estancia.',
      pathImagen: '../../../assets/img/servicios/wifi-hotel.png',
      iconClass: 'bi bi-wifi text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Piscina al aire libre',
      descripcion: ' El hotel cuenta con una piscina al aire libre, proporcionando un espacio relajante y recreativo para que los huéspedes disfruten. Ideal para días soleados, la piscina ofrece un ambiente agradable para relajarse y disfrutar de momentos de ocio.',
      pathImagen: '../../../assets/img/servicios/pool.jpg',
      iconClass: 'fa-sharp fa-solid fa-person-swimming text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Gimnasio',
      descripcion: 'Para aquellos que desean mantenerse activos durante su estancia, el hotel dispone de un gimnasio bien equipado. Los huéspedes pueden aprovechar las instalaciones para realizar entrenamientos físicos y mantener su rutina de ejercicio incluso mientras están fuera de casa.',
      pathImagen: '../../../assets/img/servicios/gym.jpg',
      iconClass: 'fa-sharp fa-solid fa-dumbbell text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Restaurante',
      descripcion: 'El hotel alberga un restaurante que ofrece opciones gastronómicas variadas. Los huéspedes pueden disfrutar de comidas deliciosas y convenientes sin tener que salir del establecimiento, proporcionando una opción conveniente para desayunos, almuerzos y cenas.',
      pathImagen: '../../../assets/img/servicios/restaurant.jpg',
      iconClass: 'fa-solid fa-utensils text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Habitaciones donde se permiten mascotas',
      descripcion: 'El hotel ofrece habitaciones designadas donde se permiten mascotas. Esto brinda a los huéspedes la posibilidad de viajar con sus compañeros peludos, asegurándose de que todos los miembros de la familia sean bienvenidos.',
      pathImagen: '../../../assets/img/servicios/mascotas.jpg',
      iconClass: 'fa-solid fa-paw text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Sala de reuniones',
      descripcion: 'Para eventos y reuniones, el hotel cuenta con salas equipadas que ofrecen un espacio profesional y cómodo. Ya sea para conferencias, seminarios o eventos corporativos, estas salas proporcionan un entorno adecuado para actividades grupales.',
      pathImagen: '../../../assets/img/servicios/meetings.jpg',
      iconClass: 'bi bi-people-fill text-body-secondary flex-shrink-0 me-3 fs-4'
    },
    {
      nombre: 'Habitaciones para fumadores',
      descripcion: 'El hotel tiene habitaciones específicas designadas para fumadores. Estas habitaciones ofrecen a los huéspedes fumadores la comodidad de disfrutar de su hábito en un entorno designado, mientras que otras áreas del hotel son libres de humo para garantizar el confort de todos los visitantes.',
      pathImagen: '../../../assets/img/servicios/smoke.png',
      iconClass: 'fa-solid fa-smoking text-body-secondary flex-shrink-0 me-3 fs-4'
    },
  ];

  constructor(
    private servicioDialog: DialogService,
    private datosCompartidosService: DatosCompartidosService
    ) {
      this.datosCompartidosService.esconderBuscador.next(false);
      this.datosCompartidosService.esconderFooter.next(false);
     }

  abrirServicioDialog(servicio: Servicio) {
    this.servicioDialog.abrirDialog(servicio);
  }
}
