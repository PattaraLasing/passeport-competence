import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '/competence', 
        loadComponent() {
            return import('./competence/competence').then(m => m.Competence);
        }
    }
];
