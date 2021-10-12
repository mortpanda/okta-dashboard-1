import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnWhoisoktaComponent } from './en-whoisokta.component';

describe('EnWhoisoktaComponent', () => {
  let component: EnWhoisoktaComponent;
  let fixture: ComponentFixture<EnWhoisoktaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnWhoisoktaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnWhoisoktaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
