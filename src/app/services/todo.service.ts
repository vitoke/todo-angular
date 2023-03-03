import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { merge, of, Subject, switchMap } from 'rxjs';
import { TODO_BACKEND_URL } from '../config';

import { Id, NewTodo, Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private readonly addTodoSubject = new Subject<NewTodo>();
  private readonly deleteTodoSubject = new Subject<Id>();

  private readonly addTodo$ = this.addTodoSubject.pipe(
    switchMap((newTodo) =>
      this.http.post<Todo>(TODO_BACKEND_URL, newTodo, {
        headers: { 'Content-Type': 'application/json' },
      })
    )
  );

  private readonly deleteTodo$ = this.deleteTodoSubject.pipe(
    switchMap((todoId) => this.http.delete(`${TODO_BACKEND_URL}/${todoId}`))
  );

  readonly todos$ = merge(of(null), this.addTodo$, this.deleteTodo$).pipe(
    switchMap(() => this.http.get<Todo[]>(TODO_BACKEND_URL))
  );

  addTodo(newTodo: NewTodo) {
    this.addTodoSubject.next(newTodo);
  }

  deleteTodo(id: Id) {
    this.deleteTodoSubject.next(id);
  }
}
