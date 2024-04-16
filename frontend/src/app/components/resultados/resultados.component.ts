import { Component } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { Habitacion } from '../../models/habitacion';
import { Global } from '../../services/global';
import { MenuItem } from 'primeng/api';
import { GuardarEstadoService } from '../../services/guardar-estado.service';
import { HabitacionHuespedes } from '../../models/habitacion-huespedes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {

  items: MenuItem[] = [];//para el menu de pasos
  activeIndex: number = 0;//indice activo del menu de pasos

  respuestas: Habitacion[][] = []; //para guardar las respuestas del componenete buscador

  habitacionHuespedes: HabitacionHuespedes[] = [];//para recibir las habitaciones y huespedes del componente buscador

  cargando = true;//para mostrar el spinner de carga hasta que se carguen los datos del backend
  cargando2 = false;//para mostrar el spinner de carga cuando se cambia de una habitacion a otra

  habitacionesSeleccionadas: (Habitacion|null)[] = [];//para guardar las habitaciones seleccionadas
  
  botonSeleccionarDesactivado = Array(4).fill(false);//para desactivar el boton de seleccionar habitacion

  visible_modal: boolean = false;
  modal_room: Habitacion=new Habitacion( '', [], '', 0, 0, 0, 0, 0, false, 0, {facilidadesAcceso: [], bano: [], habitacion: [], entretenimiento: [], alimentosBebidas: [], internet: [], mas: []});
  ;


  public url: string;//para asignar la url del backend

  constructor(
    private datosCompartidosService: DatosCompartidosService,//para recibir datos del componente buscador
    private stateService: GuardarEstadoService,//para guardar el estado del componente
    private router: Router,//para redirigir al componente ingreso-datos-cliente
  ) {
    this.datosCompartidosService.esconderFooter.next(true);//esconder el footer
    this.url = Global.url;//asignar la url del backend
  
    //Recibir los items del menu de pasos
    this.datosCompartidosService.items.subscribe(
      items => {
        this.items = items;
      }
    );
    
    //Recibir las habitaciones y huespedes
    this.datosCompartidosService.habitacionesCompartidas.subscribe(
      habitaciones => {
        this.habitacionHuespedes = habitaciones;
      }
    );

    //Recibir el array para guardar las habitaciones seleccionadas
    this.datosCompartidosService.habitacionesSeleccionadas.subscribe(
      habitacionesSeleccionadas => {
        this.habitacionesSeleccionadas = habitacionesSeleccionadas;
      }
    );


    //Recibir las respuestas
    this.datosCompartidosService.resultadosCompartidos.subscribe(
      datos => {
        this.respuestas = datos;
        this.cargando = false;
        this.botonSeleccionarDesactivado.fill(false);
        this.activeIndex = 0;
       
      }
    );

    // Recibir el estado de carga
    this.datosCompartidosService.cargando.subscribe(
      cargando => {
        this.cargando = cargando;
        
      }
    );


  }

  ngOnInit() {
    //Recuperar el estado del componente
    const state = this.stateService.get('resultadosComponentState');
    if (state) {
      this.items = state.items;
      this.activeIndex = state.activeIndex;
      this.respuestas = state.respuestas;
      this.cargando = state.cargando;
      this.cargando2 = state.cargando2;
      this.habitacionesSeleccionadas = state.habitacionesSeleccionadas;
      this.botonSeleccionarDesactivado = state.botonSeleccionarDesactivado;
      this.habitacionHuespedes = state.habitacionHuespedes;
    }
  }

  ngOnDestroy() {
    //Guardar el estado del componente
    this.stateService.set('resultadosComponentState', {
      items: this.items,
      activeIndex: this.activeIndex,
      respuestas: this.respuestas,
      cargando: this.cargando,
      cargando2: this.cargando2,
      habitacionesSeleccionadas: this.habitacionesSeleccionadas,
      botonSeleccionarDesactivado: this.botonSeleccionarDesactivado,
      habitacionHuespedes: this.habitacionHuespedes
      
    });
  }

  //Funcion para cambiar el indice activo del menu de pasos
  onActiveIndexChange(index: number) {
    this.cargando2 = true; //Mostrar el spinner de carga

    // Simular un tiempo de espera para cambiar el indice activo
    setTimeout(() => {
      this.activeIndex = index;//Cambiar el indice activo
      this.cargando2 = false;//Esconder el spinner de carga
    }, 750);
  }


  //Funcion para seleccionar una habitacion
  selectedRoom(habitacion: Habitacion, indexI: number, indexJ: number) {

    this.habitacionesSeleccionadas[indexI] = habitacion;
    //console.log("En la habitacion "+(indexI+1)+" se ha seleccionado la habitacion: "+habitacion._id);
    this.botonSeleccionarDesactivado[indexI] = true;
  
    let id = this.respuestas[indexI][indexJ]._id
  
    for (let i = 0; i < this.respuestas.length; i++){
      for (let j = 0; j < this.respuestas[i].length; j++) {
        if ( id === this.respuestas[i][j]._id ){
          this.respuestas[i][j].disponibles -= 1;
          if (this.respuestas[i][j].disponibles === 0){
            this.respuestas[i][j].disponibilidad = false;
          }
        }
      }
    }

    let isNull = this.habitacionesSeleccionadas.some( (habitacion) => habitacion === null);

    if (!isNull){
      let habitacionesSeleccionadasCliente: Habitacion[] = Array.from(this.habitacionesSeleccionadas) as Habitacion[];
      this.datosCompartidosService.habitacionesSeleccionadasCliente.next(habitacionesSeleccionadasCliente);
      //console.log(habitacionesSeleccionadasCliente);

      this.router.navigate(['/ingreso-datos-cliente']);

      setTimeout(() => {
        this.datosCompartidosService.cargandoIngresoDatosCliente.next(false);
      }, 700);
    }



    //console.log(this.habitacionesSeleccionadas);

  }
  
  //Funcion para eliminar la seleleccion de una habitación
  deleteSelection(habitacion: Habitacion, indexI: number, indexJ: number ) {
   
    this.habitacionesSeleccionadas[indexI] = null;
    this.botonSeleccionarDesactivado[indexI] = false;

    let id = this.respuestas[indexI][indexJ]._id

    for (let i = 0; i < this.respuestas.length; i++){
      for (let j = 0; j < this.respuestas[i].length; j++) {
        if ( id === this.respuestas[i][j]._id ){
          this.respuestas[i][j].disponibles += 1;
          if (this.respuestas[i][j].disponibles > 0){
            this.respuestas[i][j].disponibilidad = true;
          }
          
        }
      }
    }
    this.datosCompartidosService.cargandoIngresoDatosCliente.next(true);
    //console.log(this.habitacionesSeleccionadas);

  }
  visible(room: Habitacion){
    this.visible_modal = true;
    this.modal_room = room;
    //console.log(this.modal_room);

  }


}

