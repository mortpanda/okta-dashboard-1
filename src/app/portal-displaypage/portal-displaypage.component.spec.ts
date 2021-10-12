import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDisplaypageComponent } from './portal-displaypage.component';

describe('PortalDisplaypageComponent', () => {
  let component: PortalDisplaypageComponent;
  let fixture: ComponentFixture<PortalDisplaypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalDisplaypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDisplaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
