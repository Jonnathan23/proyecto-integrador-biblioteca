import { TestBed } from '@angular/core/testing';

import { LendbookshistoryService } from './lendbookshistory.service';

describe('LendbookshistoryService', () => {
  let service: LendbookshistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendbookshistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
