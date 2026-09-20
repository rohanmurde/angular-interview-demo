import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiService, User } from '../services/api.service';

export const userResolver: ResolveFn<User | null> = (route) => {
  const apiService = inject(ApiService);
  const id = Number(route.paramMap.get('id'));

  return apiService.getUser(id).pipe(catchError(() => of(null)));
};
