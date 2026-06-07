import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ExperienceService } from '../services/experience/experience-service';
import { Experience } from '../interfaces/experience';

export const experienceDetailsResolver: ResolveFn<Experience> = (route, state) => {

  const experienceService = inject(ExperienceService);
  const uuid = route.params['uuid'];
  return experienceService.getExperienceById(uuid);

};
