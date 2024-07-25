import { TestBed } from '@angular/core/testing';

import { MybooksService } from './mybooks.service';

describe('MybooksService', () => {
  let service: MybooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MybooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
