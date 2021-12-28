import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFireModule} from '@angular/fire/compat';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      providers: [NgxImageCompressService, AngularFireStorage],
      imports: [
        MatInputModule,
        MatIconModule,
        AngularFireModule.initializeApp({
          apiKey: 'AIzaSyCXzaNI6VVvVMUmQP_HBuulZbFz99qBx0Y',
          authDomain: 'meent-art-pinboard.firebaseapp.com',
          databaseURL: 'https://meent-art-pinboard-default-rtdb.firebaseio.com',
          projectId: 'meent-art-pinboard',
          storageBucket: 'meent-art-pinboard.appspot.com',
          messagingSenderId: '57509747354',
          appId: '1:57509747354:web:587de7d5c0adb124bb9d23'
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
