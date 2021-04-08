import { TestBed } from '@angular/core/testing';

import { PinboardService } from './pinboard.service';
import {BackendService} from "../providers/backend.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PinboardService', () => {
  let service: PinboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PinboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
