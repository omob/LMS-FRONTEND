import { TestBed } from '@angular/core/testing';

import { LecturerGuardService } from './lecturer-guard.service';

describe('LecturerGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecturerGuardService = TestBed.get(LecturerGuardService);
    expect(service).toBeTruthy();
  });
});
