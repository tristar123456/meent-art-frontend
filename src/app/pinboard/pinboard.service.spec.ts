import { TestBed } from '@angular/core/testing';

import { PinboardService } from './pinboard.service';

describe('PinboardService', () => {
  let service: PinboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
