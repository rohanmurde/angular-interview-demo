import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly auth = inject(AuthService);
  
  title = 'angular-interview-demo';

  login(): void {
    this.auth.login('demo-user', 'demo-password');
  }

  logout(): void {
    this.auth.logout();
  }

  toggle(): void {
    this.auth.toggle();
  }

}
