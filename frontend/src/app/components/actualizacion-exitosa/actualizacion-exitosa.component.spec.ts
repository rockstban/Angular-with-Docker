import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionExitosaComponent } from './actualizacion-exitosa.component';

describe('ActualizacionExitosaComponent', () => {
  let component: ActualizacionExitosaComponent;
  let fixture: ComponentFixture<ActualizacionExitosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizacionExitosaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizacionExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
