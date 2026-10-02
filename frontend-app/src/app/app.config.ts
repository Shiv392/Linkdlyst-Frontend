import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { httpInterceptor } from './Shared/Interceptors/Http.interceptor';
import { errorInterceptor } from './Shared/Interceptors/Error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor, errorInterceptor])),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
