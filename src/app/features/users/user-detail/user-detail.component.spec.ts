import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let fixture: ComponentFixture<UserDetailComponent>;

  function setup(user: unknown) {
    TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { user } } } },
      ],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
  }

  it('shows resolved user data', () => {
    setup({ id: 1, name: 'Ada', email: 'ada@example.com', rating: 5 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Ada');
  });

  it('shows a not-found message when the resolver returned null', () => {
    setup(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('not found');
  });
});
