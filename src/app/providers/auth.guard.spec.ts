import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService}, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
