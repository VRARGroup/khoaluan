import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TatcadanhgiaComponent } from './tatcadanhgia.component';

describe('TatcadanhgiaComponent', () => {
  let component: TatcadanhgiaComponent;
  let fixture: ComponentFixture<TatcadanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TatcadanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatcadanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
