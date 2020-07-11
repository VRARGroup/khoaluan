import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthemuseComponent } from './modalthemuse.component';

describe('ModalthemuseComponent', () => {
  let component: ModalthemuseComponent;
  let fixture: ComponentFixture<ModalthemuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthemuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthemuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
