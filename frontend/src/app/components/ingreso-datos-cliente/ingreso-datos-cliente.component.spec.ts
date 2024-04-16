import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoDatosClienteComponent } from './ingreso-datos-cliente.component';
import { Component } from '@angular/core';




describe('IngresoDatosClienteComponent', () => {
  let component: IngresoDatosClienteComponent;
  let fixture: ComponentFixture<IngresoDatosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoDatosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoDatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
