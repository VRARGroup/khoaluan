import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHotenComponent } from './modal-hoten.component';

describe('ModalHotenComponent', () => {
  let component: ModalHotenComponent;
  let fixture: ComponentFixture<ModalHotenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHotenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHotenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
