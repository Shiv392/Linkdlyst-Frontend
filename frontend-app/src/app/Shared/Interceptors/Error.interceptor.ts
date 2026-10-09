import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../Services/Notification.service';
import { inject } from '@angular/core';
import { CommonLoaderService } from '../Services/CommonLoaderService.service';
import { AuthService } from '../Services/Auth.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {

  const notificationService = inject(NotificationService);
  const commonLoaderService = inject(CommonLoaderService);
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      commonLoaderService.hideLoader();
      console.error(
        'HTTP request failed with status:',
        error.status
      );

      const message =
        error.error?.message ||
        error.message ||
        'An unknown error occurred';

      !error.url?.includes('user-details') && notificationService.notificationSubject$.next({
        type: 'error',
        summary: 'Error',
        detail: message,
      });

      if(error.status == 401){
        authService.logoutSubject.next(true);
      }

      return throwError(() => error);
    })
  );
};