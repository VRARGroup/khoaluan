import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquyengroupComponent } from './addquyengroup.component';

describe('AddquyengroupComponent', () => {
  let component: AddquyengroupComponent;
  let fixture: ComponentFixture<AddquyengroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddquyengroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquyengroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
