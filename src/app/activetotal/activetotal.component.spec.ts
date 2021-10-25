import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetotalComponent } from './activetotal.component';

describe('ActivetotalComponent', () => {
  let component: ActivetotalComponent;
  let fixture: ComponentFixture<ActivetotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivetotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivetotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
