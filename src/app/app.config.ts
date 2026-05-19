import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes), 
    provideIonicAngular({
      mode: 'md' //fixer en mode material design, sinon par défaut ionic prendra celui du système : ios ou md
    })
  ],
};
