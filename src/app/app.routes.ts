import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: '/vitrine', pathMatch: 'full'
    },
    {
        path: 'vitrine', 
        loadComponent() {
            return import('./pages/vitrine-page/vitrine-page').then(m => m.VitrinePage);
        }
    },
    {
        path: 'skill', 
        loadComponent() {
            return import('./pages/skill-page/skill-page').then(m => m.SkillPage);
        }
    },
    {
        path: 'experience', 
        loadComponent() {
            return import('./pages/experience-page/experience-page').then(m => m.ExperiencePage);
        }
    }
];
