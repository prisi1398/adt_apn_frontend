import { TestBed } from '@angular/core/testing';

import { LookinnApiService } from './lookinn-api.service';

describe('LookinnApiService', () => {
  let service: LookinnApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookinnApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
