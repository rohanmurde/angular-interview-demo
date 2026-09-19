import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsersListComponent } from './users-list.component';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;
  let httpMock: HttpTestingController;
  const config = { apiBaseUrl: 'http://test/api', appName: 'test' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: APP_CONFIG, useValue: config },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UsersListComponent);
  });

  afterEach(() => httpMock.verify());

  it('loads users on init', () => {
    fixture.detectChanges();
    httpMock.expectOne(`${config.apiBaseUrl}/users`).flush([
      { id: 1, name: 'Ada', email: 'ada@example.com', rating: 5 },
    ]);
    fixture.detectChanges();
    expect(fixture.componentInstance.store.users().length).toBe(1);
  });
});
