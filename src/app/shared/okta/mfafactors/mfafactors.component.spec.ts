import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfafactorsComponent } from './mfafactors.component';

describe('MfafactorsComponent', () => {
  let component: MfafactorsComponent;
  let fixture: ComponentFixture<MfafactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfafactorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfafactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
