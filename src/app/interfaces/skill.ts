export interface Skill {
    uuid: string,
    category?: string,
    title?: string | null,
    description?: string | null,
    experiencesID?: string[] | null
}

export interface CategorySkill {
  id: string;
  label: string;
}

export const CATEGORIES_SKILLS: CategorySkill[] = [
  { id: 'hard-skill', label: 'Métier' },
  { id: 'soft-skill', label: 'Transversal' }
];