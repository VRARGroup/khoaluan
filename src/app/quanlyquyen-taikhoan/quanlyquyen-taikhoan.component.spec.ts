import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyquyenTaikhoanComponent } from './quanlyquyen-taikhoan.component';

describe('QuanlyquyenTaikhoanComponent', () => {
  let component: QuanlyquyenTaikhoanComponent;
  let fixture: ComponentFixture<QuanlyquyenTaikhoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyquyenTaikhoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyquyenTaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
