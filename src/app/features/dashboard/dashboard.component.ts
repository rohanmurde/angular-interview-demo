import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((v) => v + 1);
  }

  decrement(): void {
    this.count.update((v) => Math.max(0, v - 1));
  }
}
