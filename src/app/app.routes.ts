import { Routes } from '@angular/router';
import { authGuard } from './gaurds/auth-guard';
import { experienceDetailsResolver } from './resolver/experience-details-resolver';

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
        path: 'skills',
        children: [
            {
                path: '',
                loadComponent() {
                    return import('./pages/skill-page/skill-page').then(m => m.SkillPage);
                }
            },
            {
                path: ':uuid',
                loadComponent() {
                    return import('./pages/skill-details-page/skill-details-page').then(m => m.SkillDetailsPage);
                }
            }
        ]
    },
    {
        path: 'experiences',
        children: [
            {
                path: '',
                loadComponent() {
                    return import('./pages/experience-page/experience-page').then(m => m.ExperiencePage);
                }
            },
            {
                path: ':uuid',
                resolve: {
                    expDetailsResolver: experienceDetailsResolver
                },
                loadComponent() {
                    return import('./pages/experience-details-page/experience-details-page').then(m => m.ExperienceDetailsPage);
                }
            }
        ]
    },
    {
        path: 'profil',
        loadComponent() {
            return import('./pages/profil-page/profil-page').then(m => m.ProfilPage);
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
