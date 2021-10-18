import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDisplayPageComponent } from './dashboard-display-page.component';

describe('DashboardDisplayPageComponent', () => {
  let component: DashboardDisplayPageComponent;
  let fixture: ComponentFixture<DashboardDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDisplayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
