import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogServicesComponent } from './dialog-services.component';
import { Servicio } from '../../models/servicio';

fdescribe('DialogServicesComponent', () => {
  let component: DialogServicesComponent;
  let fixture: ComponentFixture<DialogServicesComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogServicesComponent>>;
  let servicio: Servicio;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    servicio = {
      nombre: 'Estacionamiento gratis',
      descripcion: 'El hotel ofrece a sus huéspedes la conveniencia de un estacionamiento gratuito. Esto permite a los visitantes estacionar sus vehículos sin costo adicional, brindando comodidad y accesibilidad durante su estadía.',
      pathImagen: '../../../assets/img/servicios/estacionamiento.jpg',
      iconClass: 'bi bi-p-square text-body-secondary flex-shrink-0 me-3 fs-4'
    };

    await TestBed.configureTestingModule({
      declarations: [ DialogServicesComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: servicio }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia mostrarse la data', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.modal-title').textContent).toContain(servicio.nombre);
    expect(compiled.querySelector('.modal-body p').textContent).toContain(servicio.descripcion);
    expect(compiled.querySelector('.modal-body img').src).toContain(servicio.pathImagen);
  });

  it('Deberia cerrarse el diálogo cuando se presiones cerrar', () => {
    component.closeDialog();
    expect(dialogRefSpy.close.calls.count()).toBe(1, 'spy method was called once');
  });
});