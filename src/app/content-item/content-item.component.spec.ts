import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentItemComponent } from './content-item.component';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Item} from './item';

describe('ContentItemComponent', () => {
  let component: ContentItemComponent;
  let fixture: ComponentFixture<ContentItemComponent>;
  const routerMock = {navigate: jasmine.createSpy('navigate')};
  const item = {id: 'test'} as Item;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemComponent ],
      providers: [{provide: Router, useValue: routerMock}, MatDialog],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
