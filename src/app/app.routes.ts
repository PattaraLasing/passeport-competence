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
        path: 'competence', 
        loadComponent() {
            return import('./pages/competence-page/competence-page').then(m => m.CompetencePage);
        }
    },
    {
        path: 'experience', 
        loadComponent() {
            return import('./pages/experience-page/experience-page').then(m => m.ExperiencePage);
        }
    }
];
