import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../Services/Notification.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {

  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      console.log('Http error occurred:', error);
      console.error(
        'HTTP request failed with status:',
        error.status
      );

      const message =
        error.error?.message ||
        error.message ||
        'An unknown error occurred';

      notificationService.notificationSubject$.next({
        type: 'error',
        summary: 'Error',
        detail: message,
      });

      return throwError(() => error);
    })
  );
};