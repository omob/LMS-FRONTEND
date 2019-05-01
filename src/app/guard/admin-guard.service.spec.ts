import { TestBed } from '@angular/core/testing';

import { AdminGuardService } from './admin-guard.service';

describe('AdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminGuardService = TestBed.get(AdminGuardService);
    expect(service).toBeTruthy();
  });
});
