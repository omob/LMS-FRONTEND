import { TestBed } from '@angular/core/testing';

import { StudentGuardService } from './student-guard.service';

describe('StudentGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentGuardService = TestBed.get(StudentGuardService);
    expect(service).toBeTruthy();
  });
});
