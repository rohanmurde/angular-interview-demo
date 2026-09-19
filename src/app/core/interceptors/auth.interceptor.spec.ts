import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
  });

  function run(req: HttpRequest<unknown>): HttpRequest<unknown> {
    let captured!: HttpRequest<unknown>;
    const next: HttpHandlerFn = (r): Observable<HttpEvent<unknown>> => {
      captured = r;
      return of({} as HttpEvent<unknown>);
    };
    TestBed.runInInjectionContext(() => authInterceptor(req, next));
    return captured;
  }

  it('passes requests through unchanged when logged out', () => {
    const req = new HttpRequest('GET', '/api/users');
    const out = run(req);
    expect(out.headers.has('Authorization')).toBeFalse();
  });

  it('adds a Bearer token header when logged in', () => {
    auth.login('alice', 'pw');
    const req = new HttpRequest('GET', '/api/users');
    const out = run(req);
    expect(out.headers.get('Authorization')).toContain('Bearer');
  });
});
