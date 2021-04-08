import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HostConfigProvider} from "./host-config.provider";

describe('AuthService', () => {
  let service: AuthService;
  let routerMock = {navigate: jasmine.createSpy('navigate')}
  let configProviderMock = {getApiUrl: jasmine.createSpy('getApiUrl')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: Router, useValue: routerMock}, {provide: HostConfigProvider, useValue: configProviderMock}],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
