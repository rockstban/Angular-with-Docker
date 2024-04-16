import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { ReservaService } from '../../services/reserva.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-reserva',
  templateUrl: './buscar-reserva.component.html',
  styleUrl: './buscar-reserva.component.css'
})
export class BuscarReservaComponent {

  idReserva : string = "";//Para guardar el id de la reserva cuando se busca en el backend
  cargando = true;//Para mostrar el spinner de cargando cuando inicializa el componente
  cargando2 = false;//Para mostrar el spinner de cargando cuando se busca la reserva

  //Formulario para buscar la reserva
  reservaForm = this.fb.group({
    codigoReserva: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,//Formulario reactivo
    private datosCompartidosService: DatosCompartidosService,//Servicio para compartir datos entre componentes
    private reservaService: ReservaService,//Servicio de reserva
    private messageService: MessageService,//Servicio de mensajes,
    private router: Router//Para redireccionar a la pagina de detalles de la reserva
    ) {
      this.datosCompartidosService.esconderBuscador.next(true);
      this.datosCompartidosService.esconderFooter.next(true);
  }

  ngOnDestroy(){
    //this.datosCompartidosService.esconderBuscador.next(false);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = false;
      this.datosCompartidosService.esconderFooter.next(false);
     }, 500);
  }



  async buscarReserva() {
    this.cargando2 = true;
    let codigoReserva = this.reservaForm.get('codigoReserva')?.value || "";
    let message: Message | null = null;
    try {
      this.idReserva = await firstValueFrom(this.reservaService.buscarReserva(codigoReserva));
      
      this.router.navigate(['/detalles-reserva', this.idReserva]);
      
    } catch (error: any) {
      if (error.status === 400) {
        message = {severity:'error', summary:'Error', detail:'El código ingresado no es válido'};
        
      } else if (error.status === 404){
        message = {severity:'error', summary:'Error', detail:'No se encontró la reserva con el código ingresado'};
        
      } else if (error.status === 500){
        message = {severity:'error', summary:'Error', detail:'Hubo un error en el servidor'};
      }
    } finally {
      this.cargando2 = false;
      if (message) {
        this.messageService.add(message);
      }
    }
    
  }

}
