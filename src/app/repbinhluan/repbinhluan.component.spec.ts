import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepbinhluanComponent } from './repbinhluan.component';

describe('RepbinhluanComponent', () => {
  let component: RepbinhluanComponent;
  let fixture: ComponentFixture<RepbinhluanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepbinhluanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepbinhluanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
