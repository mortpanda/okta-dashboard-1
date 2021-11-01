import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaproviderComponent } from './mfaprovider.component';

describe('MfaproviderComponent', () => {
  let component: MfaproviderComponent;
  let fixture: ComponentFixture<MfaproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfaproviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfaproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
