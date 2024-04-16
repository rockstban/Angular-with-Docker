import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { GaleriaImagenesComponent } from './components/galeria-imagenes/galeria-imagenes.component';
import { IngresoDatosClienteComponent } from './components/ingreso-datos-cliente/ingreso-datos-cliente.component';
import { NuestrosServiciosComponent } from './components/nuestros-servicios/nuestros-servicios.component';
import { UbicacionContactoComponent } from './components/ubicacion-contacto/ubicacion-contacto.component';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { DetallesReservaComponent } from './components/detalles-reserva/detalles-reserva.component';
import { BuscarReservaComponent } from './components/buscar-reserva/buscar-reserva.component';
import { ModificarReservaComponent } from './components/modificar-reserva/modificar-reserva.component';
import { ActualizacionExitosaComponent } from './components/actualizacion-exitosa/actualizacion-exitosa.component';


//definir las rutas de la aplicacion
const routes: Routes = [
  {path: 'about-us', component: AboutUsComponent},
  {path: 'nuestros-servicios', component: NuestrosServiciosComponent},
  {path: 'galeria-imagenes', component: GaleriaImagenesComponent},
  {path: 'ubicacion-contacto', component: UbicacionContactoComponent},
  {path: 'resultados', component: ResultadosComponent},
  {path: 'ingreso-datos-cliente', component: IngresoDatosClienteComponent},
  {path: 'pago-exitoso/:id', component: PagoExitosoComponent },
  {path: 'detalles-reserva/:id', component: DetallesReservaComponent},
  {path: 'buscar-reserva', component: BuscarReservaComponent},
  {path: 'modificar-reserva/:id', component: ModificarReservaComponent},
  {path: 'actualizacion-exitosa/:id', component: ActualizacionExitosaComponent},
  {path: '**', component: AboutUsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
