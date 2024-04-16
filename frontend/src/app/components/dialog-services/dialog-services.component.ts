import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servicio } from '../../models/servicio';

@Component({
  selector: 'app-dialog-services',
  templateUrl: './dialog-services.component.html',
  styleUrl: './dialog-services.component.css'
})
export class DialogServicesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Servicio,
    public dialogRef: MatDialogRef<DialogServicesComponent>
    ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
