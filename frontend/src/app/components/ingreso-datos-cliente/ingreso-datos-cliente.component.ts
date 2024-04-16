import { Component, OnInit } from '@angular/core';
import { DatosCompartidosService } from '../../services/datos-compartidos.service';
import { Consulta } from '../../models/consulta';
import { HabitacionHuespedes } from '../../models/habitacion-huespedes';
import { Habitacion } from '../../models/habitacion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaypalService } from '../../services/paypal.service';
import { MessageService } from 'primeng/api';
import { Reserva, Habitaciones, Pago, Reembolso } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

declare var paypal: any;// Se declara la variable paypal para acceder al SDK de JavaScript de PayPal

@Component({
  selector: 'app-ingreso-datos-cliente',
  templateUrl: './ingreso-datos-cliente.component.html',
  styleUrl: './ingreso-datos-cliente.component.css'
})
export class IngresoDatosClienteComponent {

 
  private client_id = "AUXE302XOsSiQU2cKmPZY5Amu2ilBXeOxX0-mc73MP0YQcWGcsPAWpT-CRe7qMJZMkxoIq_ySF7404Cp";
  private intent = "capture";

  variable: string = "Ingreso de datos del cliente";

  habitaciones: HabitacionHuespedes[] = [];//para guardar las habitaciones y huespedes

  consultas: Consulta = new Consulta();//para guardar la consulta del cliente

  habitacionesSeleccionadasCliente: (Habitacion)[] = [];//para guardar las habitaciones seleccionadas

  noches: number = 0;//para guardar las noches de la consulta

  total: number = 0;//para guardar el precio total

  cargandoIngresoDatosCliente = true;//para mostrar el spinner de 

  botonPayPalActivo = false;//para mostrar el botón de PayPal

  habitacionesParaReserva: Habitaciones[] = [];//para guardar las habitaciones seleccionadas para la reserva

  pagos : Pago[] = []; //para guardar los pagos

  reembolsos : Reembolso[] = [];//para guardar los reembolsos

  reservaRespuesta: Reserva = new Reserva("","","","",new Date(),new Date(),0,[],[],[]);//para guardar la respuesta de la reserva
  
  userForm = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')]],
    numeroContacto: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    correoElectronico: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
  });

  
  constructor(
    private datosCompartidosService: DatosCompartidosService, //Servicio de datos compartidos
    private router: Router,//Para redirigir al usuario a otra página
    private fb: FormBuilder,//Para crear el formulario
    private paypalService: PaypalService,//Servicio de PayPal
    private messageService: MessageService,//Servicio de mensajes
    private reservaService: ReservaService//Servicio de reserva
    ) {

      //Validar el formulario con el boton de PayPal
      this.userForm.statusChanges.subscribe(//
        (status) => {
          this.botonPayPalActivo = status === 'VALID';
          if (this.botonPayPalActivo) {
            paypal.Buttons().actions.enable();
          } else {
            paypal.Buttons().actions.disable();
          }
        }
      );

       //Recibir el estado del spinner de carga
    this.datosCompartidosService.cargandoIngresoDatosCliente.subscribe(
      cargandoIngresoDatosCliente => {
        this.cargandoIngresoDatosCliente = cargandoIngresoDatosCliente;


        if (!this.cargandoIngresoDatosCliente) {//Si cargandoIngresoDatosCliente es falso

          //Se carga el SDK de JavaScript de PayPal
          //y el código dentro de then se ejecuta una vez que el script de PayPal se ha cargado correctamente.
          this.loadPaypalScript().then(() => {
            paypal.Buttons({

              //Estilo del botón de PayPal
              style: {
                shape: 'pill',
                color: 'blue',
                layout: 'vertical',
                label: 'pay'
              },
              fundingSource: paypal.FUNDING.PAYPAL,//Se especifica que solo el botón de PayPal se muestre en la lista de opciones de pago
              
              //Para crear una orden de PayPal, se devuelve el ID de la orden.
              createOrder: () => {
                return this.paypalService.crearOrden('capture', this.total).toPromise()
                  .then((order) => {
                    console.log(order);
                    return order.id;
                  });
              },
              onClick: () => {
                if (!this.botonPayPalActivo) {
                  this.messageService.add({severity:'error', summary:'Error', detail:'Por favor, complete correctamente el formulario.'});
                  return false;
                }
                return true;
              },
              //Para aprobar la orden de PayPal
              onApprove: (data: any) => {
                return this.paypalService.completarOrden('capture', data.orderID).toPromise()
                  .then((order_details) => {
                    console.log(order_details);

                    //Datos de la reserva
                    let nombreCliente = this.userForm.get('nombreCompleto')?.value || "";
                    let numeroContacto = this.userForm.get('numeroContacto')?.value || "";
                    let correoElectronico = this.userForm.get('correoElectronico')?.value || "";
                    let fechaInicio = this.consultas.fechaInicio;
                    let fechaFin = this.consultas.fechaFin;
                    let captureId = order_details.purchase_units[0].payments.captures[0].id;
                    this.pagos.push(new Pago(captureId, this.total, new Date()));

                    //Se crea el modelo de la reserva
                    let reserva: Reserva = new Reserva(
                      "",
                      nombreCliente,
                      numeroContacto,
                      correoElectronico,
                      fechaInicio,
                      fechaFin,
                      this.total,
                      this.habitacionesParaReserva,
                      this.pagos,
                      this.reembolsos
                    );

                    //Para crear la reserva en la base de datos
                    this.reservaService.crearReserva(reserva).subscribe(
                      response => {
                        console.log(response);
                        // Redirige al usuario a la página de pago exitoso
                        this.router.navigate(['/pago-exitoso', response._id]);
                      },
                      error => {
                        console.log(error);
                      }
                    );
                    
                  })
                  .catch((error) => {
                    console.log(error);
                    this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error con el pago. Por favor, intente nuevamente.'});
                  });
              },
              //Si el pago es cancelado
              onCancel: () => {
                console.log('¡El pago fué cancelado!');
                this.messageService.add({severity:'warn', summary:'', detail:'¡El pago fué cancelado!'});
              },
              //Si hay un error en el pago
              onError: (err: any) => {
                console.log(err);
              }
            }).render('#payment_options');//Se renderiza el botón de PayPal en el div con el id payment_options
          });
        }
      }
    
    );

    //Recibir las habitaciones y huespedes
    this.datosCompartidosService.habitacionesCompartidas.subscribe(
      habitaciones => {
        this.habitaciones = habitaciones;
        console.log(this.habitaciones);
      }
    );

    //Recibir la consulta
    this.datosCompartidosService.consulta.subscribe(
      consulta => {
        this.consultas = consulta;
        console.log(this.consultas);
      }
    );

    //Recibir las habitaciones seleccionadas
    this.datosCompartidosService.habitacionesSeleccionadasCliente.subscribe(
      habitacionesSeleccionadasCliente => {
        this.habitacionesSeleccionadasCliente = habitacionesSeleccionadasCliente;
        console.log(this.habitacionesSeleccionadasCliente);
      }
    );


    this.noches = this.datosCompartidosService.obtenerNoches(this.consultas.fechaInicio, this.consultas.fechaFin);

    for (let i = 0; i < this.habitacionesSeleccionadasCliente.length; i++) {
      this.total += this.habitacionesSeleccionadasCliente[i].precio * this.noches;
    }

    
    
  }

  ngOnInit() {
    for(let i = 0; i < this.habitaciones.length;i++){
      this.habitacionesParaReserva.push(new Habitaciones(
        this.habitacionesSeleccionadasCliente[i]._id, 
        this.habitaciones[i].adultos, 
        this.habitaciones[i].ninos
        ));
    }

    




    console.log(this.habitacionesParaReserva);
  }

  actualizarSeleccionHabitaciones() {
    //this.datosCompartidosService.cargando.next(false);
    this.cargandoIngresoDatosCliente = true;
    this.router.navigate(['/resultados']);
    
  }

  addCliente()  {
    console.log(this.userForm.value);
  }

  //Metodo para cargar el SDK de PayPal
  //(SDK:  conjunto de bibliotecas de software que proporciona funciones para integrar los servicios de PayPal )
  loadPaypalScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');//Se crea un elemento script

      //Se le asigna la url del SDK de PayPal
      scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${this.client_id}&enable-funding=venmo&currency=USD&intent=${this.intent}`;

      //Cuando el script se carga correctamente se resuelve la promesa
      scriptElement.onload = resolve;

      //Cuando el script no se carga correctamente se rechaza la promesa
      scriptElement.onerror = reject;

      //Se agrega el script al al cuerpo del documento
      document.body.appendChild(scriptElement);
    });
  }
}
