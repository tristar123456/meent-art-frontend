import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MatSnackBar, useValue: {}}
      ]
    }).compileComponents();
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'Meent.art'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Meent.art');
  });
});
