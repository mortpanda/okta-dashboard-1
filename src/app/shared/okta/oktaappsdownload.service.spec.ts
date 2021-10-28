import { TestBed } from '@angular/core/testing';

import { OktaappsdownloadService } from './oktaappsdownload.service';

describe('OktaappsdownloadService', () => {
  let service: OktaappsdownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaappsdownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
