import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDanhgiaphuComponent } from './modal-danhgiaphu.component';

describe('ModalDanhgiaphuComponent', () => {
  let component: ModalDanhgiaphuComponent;
  let fixture: ComponentFixture<ModalDanhgiaphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDanhgiaphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDanhgiaphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
