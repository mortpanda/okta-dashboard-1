import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoisoktaComponent } from './whoisokta.component';

describe('WhoisoktaComponent', () => {
  let component: WhoisoktaComponent;
  let fixture: ComponentFixture<WhoisoktaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoisoktaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoisoktaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
