import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { APP_CONFIG } from '../tokens/app-config.token';

describe('ApiService', () => {
  let service: ApiService;
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
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('fetches all users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(1);
    });
    const req = httpMock.expectOne(`${config.apiBaseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'Ada', email: 'ada@example.com', rating: 5 }]);
  });

  it('fetches a single user by id', () => {
    service.getUser(1).subscribe((user) => {
      expect(user.name).toBe('Ada');
    });
    const req = httpMock.expectOne(`${config.apiBaseUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, name: 'Ada', email: 'ada@example.com', rating: 5 });
  });
});
