import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmainnhanvienComponent } from './appmainnhanvien.component';

describe('AppmainnhanvienComponent', () => {
  let component: AppmainnhanvienComponent;
  let fixture: ComponentFixture<AppmainnhanvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppmainnhanvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmainnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
