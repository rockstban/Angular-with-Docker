import { TestBed } from '@angular/core/testing';

import { BusquedaBackendService } from './busqueda-backend.service';

describe('BusquedaBackendService', () => {
  let service: BusquedaBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
