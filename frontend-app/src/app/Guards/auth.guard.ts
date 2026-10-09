import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Shared/Services/Auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isLoggedIn()) {
    return true; 
  }
  
  else {
    // Redirect unauthenticated users to the login page
    return router.createUrlTree(['/auth/login']); 
  }
};
