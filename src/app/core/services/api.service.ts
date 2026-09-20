import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app.config';

export interface User {
  id: number;
  name: string;
  email: string;
  rating: number;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiBaseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.config.apiBaseUrl}/users/${id}`);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.config.apiBaseUrl}/todos`);
  }
}
