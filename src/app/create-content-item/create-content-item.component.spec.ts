import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentItemComponent } from './create-content-item.component';
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {AuthService} from "../providers/auth.service";
import {BackendService} from "../providers/backend.service";
import {NgxImageCompressService} from "ngx-image-compress";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

describe('CreateContentItemComponent', () => {
  let component: CreateContentItemComponent;
  let fixture: ComponentFixture<CreateContentItemComponent>;
  let routerMock = {navigate: jasmine.createSpy('navigate')}
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get')
      }
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContentItemComponent, FileUploadComponent],
      providers: [{provide: AuthService}, {provide: Router, useValue: routerMock}, {
        provide: ActivatedRoute,
        useValue: activatedRouteMock
      }, BackendService, NgxImageCompressService, AngularFireStorage],
      imports: [
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyCXzaNI6VVvVMUmQP_HBuulZbFz99qBx0Y",
          authDomain: "meent-art-pinboard.firebaseapp.com",
          databaseURL: "https://meent-art-pinboard-default-rtdb.firebaseio.com",
          projectId: "meent-art-pinboard",
          storageBucket: "meent-art-pinboard.appspot.com",
          messagingSenderId: "57509747354",
          appId: "1:57509747354:web:587de7d5c0adb124bb9d23"
        }),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
