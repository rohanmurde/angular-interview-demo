import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService, User } from '../../../core/services/api.service';
import { AppStoreService } from '../../../core/services/app-store.service';
import { SearchFilterPipe } from '../../../shared/pipes/search-filter.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SearchFilterPipe, HighlightDirective],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly store = inject(AppStoreService);

  readonly search = new FormControl('', { nonNullable: true });
  readonly searchTerm = signal('');

  constructor() {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) => this.searchTerm.set(term));
  }

  ngOnInit(): void {
    // Keep users already added to the in-memory store. The form adds demo
    // users locally, so fetching again here would replace them with the API
    // response when navigating back to this page.
    if (this.store.users().length > 0) {
      return;
    }

    this.store.setLoading(true);
    this.api.getUsers().subscribe({
      next: (users: User[]) => {
        this.store.setUsers(users);
        this.store.setLoading(false);
      },
      error: () => this.store.setLoading(false),
    });
  }
}
