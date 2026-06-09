import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Auth, getAuth, provideAuth, signInAnonymously } from '@angular/fire/auth';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideIonicAngular({
      mode: 'md' //fixer en mode material design, sinon par défaut ionic prendra celui du système : ios ou md
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    /* provideAppInitializer(async () => {
      const auth = inject(Auth);
      await signInAnonymously(auth); // do not use `await` with `signInAnonymously` into appInitializer for PWA
    }), */
  ],
};

