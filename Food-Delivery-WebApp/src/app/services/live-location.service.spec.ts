import { TestBed } from '@angular/core/testing';

import { LiveLocationService } from './live-location.service';

describe('LiveLocationService', () => {
  let service: LiveLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
