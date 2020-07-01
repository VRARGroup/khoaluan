import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewspComponent } from './reviewsp.component';

describe('ReviewspComponent', () => {
  let component: ReviewspComponent;
  let fixture: ComponentFixture<ReviewspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
