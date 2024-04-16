import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NuestrosServiciosComponent } from './components/nuestros-servicios/nuestros-servicios.component';
import { GaleriaImagenesComponent } from './components/galeria-imagenes/galeria-imagenes.component';
import { UbicacionContactoComponent } from './components/ubicacion-contacto/ubicacion-contacto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogServicesComponent } from './components/dialog-services/dialog-services.component';
import { DetalleGaleriaComponent } from './components/detalle-galeria/detalle-galeria.component';
import { IngresoDatosClienteComponent } from './components/ingreso-datos-cliente/ingreso-datos-cliente.component';
import { FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { GalleriaModule } from 'primeng/galleria';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { DetallesReservaComponent } from './components/detalles-reserva/detalles-reserva.component';
import { BuscarReservaComponent } from './components/buscar-reserva/buscar-reserva.component';
import { ModificarReservaComponent } from './components/modificar-reserva/modificar-reserva.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActualizacionExitosaComponent } from './components/actualizacion-exitosa/actualizacion-exitosa.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutUsComponent,
    NuestrosServiciosComponent,
    GaleriaImagenesComponent,
    UbicacionContactoComponent,
    DialogServicesComponent,
    DetalleGaleriaComponent,
    IngresoDatosClienteComponent,
    DetalleHabitacionComponent,
    BuscadorComponent,
    ResultadosComponent,
    PagoExitosoComponent,
    DetallesReservaComponent,
    BuscarReservaComponent,
    ModificarReservaComponent,
    FooterComponent,
    ActualizacionExitosaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    ToastModule,
    ProgressSpinnerModule,
    StepsModule,
    GalleriaModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    PanelModule
  
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
