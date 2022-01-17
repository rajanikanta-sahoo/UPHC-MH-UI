import { TestBed } from '@angular/core/testing';

import { SubmissionServiceService } from './submission-service.service';

describe('SubmissionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionServiceService = TestBed.get(SubmissionServiceService);
    expect(service).toBeTruthy();
  });
});
