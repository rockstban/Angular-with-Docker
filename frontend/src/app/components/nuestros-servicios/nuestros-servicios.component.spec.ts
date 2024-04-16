import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosServiciosComponent } from './nuestros-servicios.component';

describe('NuestrosServiciosComponent', () => {
  let component: NuestrosServiciosComponent;
  let fixture: ComponentFixture<NuestrosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuestrosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestrosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
