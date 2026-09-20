import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/services/api.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly user = this.activatedRoute.snapshot.data['user'] as User | null;
}
