import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsignonComponent } from './appsignon.component';

describe('AppsignonComponent', () => {
  let component: AppsignonComponent;
  let fixture: ComponentFixture<AppsignonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsignonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsignonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
