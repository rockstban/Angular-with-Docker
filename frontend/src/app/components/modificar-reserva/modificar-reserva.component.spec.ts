import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReservaComponent } from './modificar-reserva.component';

describe('ModificarReservaComponent', () => {
  let component: ModificarReservaComponent;
  let fixture: ComponentFixture<ModificarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
