import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor.service';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptor;
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
