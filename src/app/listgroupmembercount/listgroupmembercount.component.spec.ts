import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgroupmembercountComponent } from './listgroupmembercount.component';

describe('ListgroupmembercountComponent', () => {
  let component: ListgroupmembercountComponent;
  let fixture: ComponentFixture<ListgroupmembercountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgroupmembercountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgroupmembercountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
