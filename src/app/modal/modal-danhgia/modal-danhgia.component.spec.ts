import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDanhgiaComponent } from './modal-danhgia.component';

describe('ModalDanhgiaComponent', () => {
  let component: ModalDanhgiaComponent;
  let fixture: ComponentFixture<ModalDanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
