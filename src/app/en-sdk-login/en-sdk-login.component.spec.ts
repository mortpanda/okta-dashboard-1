import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnSdkLoginComponent } from './en-sdk-login.component';

describe('EnSdkLoginComponent', () => {
  let component: EnSdkLoginComponent;
  let fixture: ComponentFixture<EnSdkLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnSdkLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnSdkLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
