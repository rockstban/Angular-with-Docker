import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionContactoComponent } from './ubicacion-contacto.component';

describe('UbicacionContactoComponent', () => {
  let component: UbicacionContactoComponent;
  let fixture: ComponentFixture<UbicacionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UbicacionContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbicacionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
