import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditItemComponent} from './edit-item.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../providers/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {NgxImageCompressService} from "ngx-image-compress";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorage} from "@angular/fire/storage";
import {BackendService} from "../providers/backend.service";

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;
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
      declarations: [EditItemComponent, FileUploadComponent],
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
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
