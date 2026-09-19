import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { userResolver } from './user.resolver';
import { APP_CONFIG } from '../tokens/app-config.token';

describe('userResolver', () => {
  let httpMock: HttpTestingController;
  const config = { apiBaseUrl: 'http://test/api', appName: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: config },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('resolves the user for the given id', (done) => {
    const route = { paramMap: { get: () => '1' } } as never;
    TestBed.runInInjectionContext(() => {
      const result = userResolver(route, {} as never) as Observable<unknown>;
      result.subscribe((user) => {
        expect((user as { name: string }).name).toBe('Ada');
        done();
      });
    });
    httpMock.expectOne(`${config.apiBaseUrl}/users/1`).flush({
      id: 1,
      name: 'Ada',
      email: 'ada@example.com',
      rating: 5,
    });
  });

  it('resolves null on a failed request instead of throwing', (done) => {
    const route = { paramMap: { get: () => '99' } } as never;
    TestBed.runInInjectionContext(() => {
      const result = userResolver(route, {} as never) as Observable<unknown>;
      result.subscribe((user) => {
        expect(user).toBeNull();
        done();
      });
    });
    httpMock.expectOne(`${config.apiBaseUrl}/users/99`).error(new ProgressEvent('error'));
  });
});
