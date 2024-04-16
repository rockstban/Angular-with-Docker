import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servicio } from '../models/servicio';
import { DialogServicesComponent } from '../components/dialog-services/dialog-services.component';
import { Galeria } from '../models/galeria';
import { DetalleGaleriaComponent } from '../components/detalle-galeria/detalle-galeria.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  abrirDialog(servicio: Servicio) {
    this.dialog.open(DialogServicesComponent, {
      data: servicio,
      width: '750px',
    });
  }

  abrirDialogGaleria(galeria: Galeria){
    this.dialog.open(DetalleGaleriaComponent, {
      data: galeria,
      width: '70%',
    });
  }

}


