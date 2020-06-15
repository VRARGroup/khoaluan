import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmainquanlyComponent } from './appmainquanly.component';

describe('AppmainquanlyComponent', () => {
  let component: AppmainquanlyComponent;
  let fixture: ComponentFixture<AppmainquanlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppmainquanlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmainquanlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
