import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnLoginPageComponent } from './en-login-page.component';

describe('EnLoginPageComponent', () => {
  let component: EnLoginPageComponent;
  let fixture: ComponentFixture<EnLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
