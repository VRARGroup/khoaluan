import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBinhluanphuComponent } from './modal-binhluanphu.component';

describe('ModalBinhluanphuComponent', () => {
  let component: ModalBinhluanphuComponent;
  let fixture: ComponentFixture<ModalBinhluanphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBinhluanphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBinhluanphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
