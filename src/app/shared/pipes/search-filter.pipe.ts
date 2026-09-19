import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true,
  pure: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform<T>(items: T[] | null, term: string | null, field: keyof T): T[] {
    if (!items) return [];
    if (!term) return items;
    const needle = term.toLowerCase();
    return items.filter((item) =>
      String(item[field] ?? '').toLowerCase().includes(needle)
    );
  }
}
