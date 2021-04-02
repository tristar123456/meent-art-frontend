import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentItemComponent } from './content-item.component';

describe('ContentItemComponent', () => {
  let component: ContentItemComponent;
  let fixture: ComponentFixture<ContentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
