import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoExitosoComponent } from './pago-exitoso.component';

describe('PagoExitosoComponent', () => {
  let component: PagoExitosoComponent;
  let fixture: ComponentFixture<PagoExitosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoExitosoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
