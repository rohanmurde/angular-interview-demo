import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HomeComponent] }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
  });

  it('shows a login button when logged out', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('You are not logged in.');
  });

  it('shows a logout button after logging in', () => {
    fixture.componentInstance.auth.login('testuser', 'password');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('About this demo');
  });
});
