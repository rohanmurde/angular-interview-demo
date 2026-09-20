import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.message || error.message || 'Something went wrong.';

      console.error(`[HTTP Error] ${req.method} ${req.url}`, error);

      if (error.status === 401) {
        auth.logout();
      }

      return throwError(() => ({
        message,
        status: error.status,
        originalError: error,
      }));
    })
  );
};
