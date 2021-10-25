import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveusersComponent } from './inactiveusers.component';

describe('InactiveusersComponent', () => {
  let component: InactiveusersComponent;
  let fixture: ComponentFixture<InactiveusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
