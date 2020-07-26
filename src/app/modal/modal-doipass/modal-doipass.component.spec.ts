import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoipassComponent } from './modal-doipass.component';

describe('ModalDoipassComponent', () => {
  let component: ModalDoipassComponent;
  let fixture: ComponentFixture<ModalDoipassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDoipassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDoipassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
