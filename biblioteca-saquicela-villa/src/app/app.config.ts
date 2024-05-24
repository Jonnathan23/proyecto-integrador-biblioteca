import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"biblioteca-saquicela-villa","appId":"1:341088226356:web:ca95769805a34a06fc4e61","storageBucket":"biblioteca-saquicela-villa.appspot.com","apiKey":"AIzaSyCpiV4jYGM0cx6Hu8z7SnPE2cxak7UWGC4","authDomain":"biblioteca-saquicela-villa.firebaseapp.com","messagingSenderId":"341088226356"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
