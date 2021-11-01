import { TestBed } from '@angular/core/testing';

import { OktafactorsService } from './oktafactors.service';

describe('OktafactorsService', () => {
  let service: OktafactorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktafactorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
