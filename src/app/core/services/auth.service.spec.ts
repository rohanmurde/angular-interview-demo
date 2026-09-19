import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('starts logged out', () => {
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.token()).toBeNull();
  });

  it('logs in and sets a token', () => {
    service.login('alice', 'pw');
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.token()).toContain('alice');
  });

  it('logs out and clears the token', () => {
    service.login('alice', 'pw');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.token()).toBeNull();
  });
});
