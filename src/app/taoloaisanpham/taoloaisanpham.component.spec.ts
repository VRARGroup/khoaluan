import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoloaisanphamComponent } from './taoloaisanpham.component';

describe('TaoloaisanphamComponent', () => {
  let component: TaoloaisanphamComponent;
  let fixture: ComponentFixture<TaoloaisanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoloaisanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoloaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
