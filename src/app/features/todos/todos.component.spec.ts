import { fakeAsync, tick } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';
import { ApiService, Todo } from '../../core/services/api.service';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let fixture: ComponentFixture<TodosComponent>;
  let component: TodosComponent;
  let todosSubject: Subject<Todo[]>;

  const createTodos = (count: number): Todo[] => 
    Array.from({ length: count }, (_, index) => ({
      userId: 1,
      id: index + 1,
      title: `Todo ${index + 1}`,
      completed: index % 2 === 0,
    }));

  beforeEach(async () => {
    todosSubject = new Subject<Todo[]>();

    await TestBed.configureTestingModule({
      imports: [TodosComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getTodos: (): Observable<Todo[]> => todosSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('shows a loading state until the todo request completes', () => {
    fixture.detectChanges();

    expect(component.todo_loading()).toBeTrue();

    todosSubject.next(createTodos(20));
    expect(component.displayedTodos().length).toBe(20);
    expect(component.todo_loading()).toBeTrue();

    todosSubject.complete();
    expect(component.todo_loading()).toBeFalse();
  });

  it('displays the first 20 todos initially', () => {
    fixture.detectChanges();
    const todos = createTodos(25);

    todosSubject.next(todos);
    todosSubject.complete();

    expect(component.totalTodosFetchedCount()).toBe(25);
    expect(component.displayedTodos().length).toBe(20);
    expect(component.displayedTodos()).toEqual(todos.slice(0, 20));
    expect(component.showLoadMore()).toBeTrue();
  });

  it('loads todos in batches of 20', () => {
    fixture.detectChanges();
    todosSubject.next(createTodos(60));
    todosSubject.complete();

    component.loadMore();
    expect(component.displayedTodos().length).toBe(40);

    component.loadMore();
    expect(component.displayedTodos().length).toBe(60);
    expect(component.showLoadMore()).toBeFalse();
  });

  it('does not display more than 100 todos', () => {
    fixture.detectChanges();
    todosSubject.next(createTodos(120));
    todosSubject.complete();

    for (let batch = 0; batch < 5; batch++) {
      component.loadMore();
    }

    expect(component.displayedTodos().length).toBe(100);
    expect(component.showLoadMore()).toBeFalse();
  });

  it('does not show Load More when there are 20 or fewer todos', () => {
    fixture.detectChanges();
    todosSubject.next(createTodos(20));
    todosSubject.complete();

    expect(component.displayedTodos().length).toBe(20);
    expect(component.showLoadMore()).toBeFalse();
  });

  it('updates the search term after the debounce period', fakeAsync(() => {
    fixture.detectChanges();

    component.searchTodo.setValue('angular');
    expect(component.searchTermTodo()).toBe('');

    tick(299);
    expect(component.searchTermTodo()).toBe('');

    tick(1);
    expect(component.searchTermTodo()).toBe('angular');
  }));
});
