import { Injectable, signal, computed } from '@angular/core';
import { User } from './api.service';

@Injectable({ providedIn: 'root' })
export class AppStoreService {
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal(false);
  private readonly _selectedUserId = signal<number | null>(null);

  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly selectedUser = computed(() =>
    this._users().find((u) => u.id === this._selectedUserId()) ?? null
  );

  setUsers(users: User[]): void {
    this._users.set(users);
  }

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  selectUser(id: number | null): void {
    this._selectedUserId.set(id);
  }
}
