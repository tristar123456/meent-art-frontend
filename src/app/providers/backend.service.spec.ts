import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BackendService', () => {
  let service: BackendService;
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService}, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
