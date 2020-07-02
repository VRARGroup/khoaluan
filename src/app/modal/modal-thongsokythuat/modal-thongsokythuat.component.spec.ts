import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThongsokythuatComponent } from './modal-thongsokythuat.component';

describe('ModalThongsokythuatComponent', () => {
  let component: ModalThongsokythuatComponent;
  let fixture: ComponentFixture<ModalThongsokythuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalThongsokythuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThongsokythuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
