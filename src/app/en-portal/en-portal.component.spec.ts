import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnPortalComponent } from './en-portal.component';

describe('EnPortalComponent', () => {
  let component: EnPortalComponent;
  let fixture: ComponentFixture<EnPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
