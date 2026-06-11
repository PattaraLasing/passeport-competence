import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SkillService } from '../../services/skill/skill-service';
import { Skill } from '../../interfaces/skill';

export const skillDetailsResolver: ResolveFn<Skill> = (route, state) => {
  const skillService = inject(SkillService);
  const uuid = route.params['uuid'];
  return skillService.getSkillById(uuid);
};
