import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDanhGiaPhuComponent } from './modal-danhgiaphu.component';

describe('ModalDanhGiaPhuComponent', () => {
  let component: ModalDanhGiaPhuComponent;
  let fixture: ComponentFixture<ModalDanhGiaPhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDanhGiaPhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanhGiaPhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
