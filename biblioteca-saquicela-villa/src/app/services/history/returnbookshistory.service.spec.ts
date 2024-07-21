import { TestBed } from '@angular/core/testing';

import { ReturnbookshistoryService } from './returnbookshistory.service';

describe('ReturnbookshistoryService', () => {
  let service: ReturnbookshistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnbookshistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
