import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PinboardComponent } from './pinboard.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../providers/auth.service";
import {FilterService} from "../providers/filter.service";
import {ResizeService} from "../size-detector/resize.service";
import {PinboardService} from "./pinboard.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FilterItemPipe} from "./filter-item.pipe";

describe('PinboardComponent', () => {
  let component: PinboardComponent;
  let fixture: ComponentFixture<PinboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PinboardComponent, FilterItemPipe],
      providers: [AuthService, FilterService, ResizeService, PinboardService],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
