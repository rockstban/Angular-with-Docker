import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReservaComponent } from './buscar-reserva.component';

describe('BuscarReservaComponent', () => {
  let component: BuscarReservaComponent;
  let fixture: ComponentFixture<BuscarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
