import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { skillDetailsResolver } from './skill-details-resolver';
import { Skill } from '../../interfaces/skill';

describe('skillDetailsResolver', () => {
  const executeResolver: ResolveFn<Skill> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => skillDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
