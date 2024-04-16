import { TestBed } from '@angular/core/testing';

import { GuardarEstadoService } from './guardar-estado.service';

describe('GuardarEstadoService', () => {
  let service: GuardarEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
