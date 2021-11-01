import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfafactortypeComponent } from './mfafactortype.component';

describe('MfafactortypeComponent', () => {
  let component: MfafactortypeComponent;
  let fixture: ComponentFixture<MfafactortypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfafactortypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfafactortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
