import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let auth: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() =>
      authGuard({} as never, { url: '/admin' } as never)
    );
  }

  it('allows activation when logged in', () => {
    auth.login('alice', 'pw');
    expect(runGuard()).toBeTrue();
  });

  it('blocks activation and redirects home when logged out', () => {
    const navigateSpy = spyOn(router, 'navigate');
    expect(runGuard()).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
