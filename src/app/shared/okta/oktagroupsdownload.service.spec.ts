import { TestBed } from '@angular/core/testing';

import { OktagroupsdownloadService } from './oktagroupsdownload.service';

describe('OktagroupsdownloadService', () => {
  let service: OktagroupsdownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktagroupsdownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
