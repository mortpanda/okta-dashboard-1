import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdetailsComponent } from './appdetails.component';

describe('AppdetailsComponent', () => {
  let component: AppdetailsComponent;
  let fixture: ComponentFixture<AppdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
