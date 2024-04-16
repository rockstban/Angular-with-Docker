import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReservaComponent } from './detalles-reserva.component';

describe('DetallesReservaComponent', () => {
  let component: DetallesReservaComponent;
  let fixture: ComponentFixture<DetallesReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
