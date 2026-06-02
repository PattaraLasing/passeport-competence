import { Routes } from '@angular/router';
import { authGuard } from './gaurds/auth-guard';

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
    },
    {
        path: 'connexion', 
        loadComponent() {
            return import('./pages/connexion-page/connexion-page').then(m => m.ConnexionPage);
        }
    },
    {
        path: 'admin', 
        canActivate: [authGuard],
        loadComponent() {
            return import('./pages/admin-page/admin-page').then(m => m.AdminPage);
        }
    }
];
