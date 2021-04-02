import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateContentItemComponent } from './create-content-item.component';

describe('CreateContentItemComponent', () => {
  let component: CreateContentItemComponent;
  let fixture: ComponentFixture<CreateContentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
