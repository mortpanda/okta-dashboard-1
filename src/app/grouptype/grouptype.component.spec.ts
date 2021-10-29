import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptypeComponent } from './grouptype.component';

describe('GrouptypeComponent', () => {
  let component: GrouptypeComponent;
  let fixture: ComponentFixture<GrouptypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrouptypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
