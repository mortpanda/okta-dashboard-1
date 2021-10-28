import { TestBed } from '@angular/core/testing';

import { OktausersdownloadService } from './oktausersdownload.service';

describe('OktausersdownloadService', () => {
  let service: OktausersdownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktausersdownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
