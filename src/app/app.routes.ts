import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { userResolver } from './core/resolvers/user.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
    title: 'Admin',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
    title: 'Users',
  },
  {
    path: 'users/new',
    loadComponent: () =>
      import('./features/users/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
    title: 'New User',
  },
  {
    path: 'users/:id',
    resolve: { user: userResolver },
    loadComponent: () =>
      import('./features/users/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
    title: 'User Detail',
  },
  { path: '**', redirectTo: 'home' },
];
