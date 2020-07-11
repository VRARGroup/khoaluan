import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemtaikhoanComponent } from './themtaikhoan.component';

describe('ThemtaikhoanComponent', () => {
  let component: ThemtaikhoanComponent;
  let fixture: ComponentFixture<ThemtaikhoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemtaikhoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemtaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
