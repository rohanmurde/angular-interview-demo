import { TestBed } from '@angular/core/testing';
import { AppStoreService } from './app-store.service';

describe('AppStoreService', () => {
  let service: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStoreService);
  });

  it('starts empty and not loading', () => {
    expect(service.users()).toEqual([]);
    expect(service.loading()).toBeFalse();
  });

  it('selects a user by id via computed()', () => {
    service.setUsers([{ id: 1, name: 'Ada', email: 'ada@example.com', rating: 5 }]);
    service.selectUser(1);
    expect(service.selectedUser()?.name).toBe('Ada');
  });
});
