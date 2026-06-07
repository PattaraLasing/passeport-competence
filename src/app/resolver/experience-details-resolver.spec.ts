import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { experienceDetailsResolver } from './experience-details-resolver';
import { Experience } from '../interfaces/experience';

describe('experienceDetailsResolver', () => {
  const executeResolver: ResolveFn<Experience> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => experienceDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
