import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _token = signal<string | null>(null);

  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => this._token() !== null);

  login(username: string, _password: string): void {
    // Demo only: any non-empty username "succeeds" and issues a fake bearer token.
    this._token.set(`demo-token-for-${username}`);
  }

  logout(): void {
    this._token.set(null);
  }

  toggle(): void {
    if (this.isLoggedIn()) {
      this.logout();
    } else {
      this.login('demo-user', 'demo-password');
    }
  }
}
