import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppfeatureComponent } from './appfeature.component';

describe('AppfeatureComponent', () => {
  let component: AppfeatureComponent;
  let fixture: ComponentFixture<AppfeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppfeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
