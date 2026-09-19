import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthService } from '../../core/services/auth.service';

describe('AdminComponent', () => {
  let fixture: ComponentFixture<AdminComponent>;
  let auth: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    auth.login('alice', 'pw');
  });

  it('redirects to /home via effect() when the user logs out', () => {
    const navigateSpy = spyOn(router, 'navigate');
    fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    auth.logout();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
