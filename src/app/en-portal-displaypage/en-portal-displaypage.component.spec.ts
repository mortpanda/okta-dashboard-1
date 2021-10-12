import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnPortalDisplaypageComponent } from './en-portal-displaypage.component';

describe('EnPortalDisplaypageComponent', () => {
  let component: EnPortalDisplaypageComponent;
  let fixture: ComponentFixture<EnPortalDisplaypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnPortalDisplaypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnPortalDisplaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
