import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ApiService, Todo } from '../../core/services/api.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TodosComponent {
  private readonly api = inject(ApiService);
  
  readonly loading = signal(false);
  readonly todos = signal<Todo[]>([]);
  readonly visibleCount = signal(0);

  // Total number of todos fetched from the API
  readonly totalTodosFetchedCount = computed(() => this.todos().length);
  // Limit the number of todos to show to 100 or less.
  readonly limitTodosToShow = computed(() => Math.min(this.totalTodosFetchedCount(), 100)); 
  // Displayed todos on UI based on the visible count
  readonly displayedTodos = computed(() => this.todos().slice(0, this.visibleCount()));
  // Determine if the "Load More" button should be shown based on the visible count and limit.
  readonly showLoadMore = computed(() => {
    return this.visibleCount() < this.limitTodosToShow();
  });

  ngOnInit(): void {
    this.loading.set(true);

    this.api.getTodos().subscribe({
      next: (items) => {
        this.todos.set(items);
        this.visibleCount.set(Math.min(20, items.length));
      },
      error: (error) => {
        console.error('Failed to load todos:', error);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  loadMore(): void {
    const current = this.visibleCount();
    const next = Math.min(current + 20, this.limitTodosToShow());
    this.visibleCount.set(next);
  }
}
