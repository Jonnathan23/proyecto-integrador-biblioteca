import { TestBed } from '@angular/core/testing';

import { DataatribucionesService } from './dataatribuciones.service';

describe('DataatribucionesService', () => {
  let service: DataatribucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataatribucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
