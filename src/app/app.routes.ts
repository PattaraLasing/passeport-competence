import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: '/competence', pathMatch: 'full'
    },
    {
        path: 'competence', 
        loadComponent() {
            return import('./competence/competence').then(m => m.Competence);
        }
    }
];
