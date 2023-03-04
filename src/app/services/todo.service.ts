import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { merge, mergeMap, of, Subject, switchMap, tap } from 'rxjs';
import { TODO_BACKEND_URL } from '../config';

import { Id, NewTodo, Todo } from '../model/todo';

const HEADERS = { 'Content-Type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private readonly addTodoSubject = new Subject<NewTodo>();
  private readonly deleteTodoSubject = new Subject<Id>();
  private readonly updateTodoSubject = new Subject<Todo>();

  private readonly addTodo$ = this.addTodoSubject.pipe(
    tap((v) => console.log('add', v)),
    mergeMap((newTodo) =>
      this.http.post<Todo>(TODO_BACKEND_URL, newTodo, {
        headers: HEADERS,
      })
    )
  );

  private readonly deleteTodo$ = this.deleteTodoSubject.pipe(
    tap((v) => console.log('delete', v)),
    mergeMap((todoId) => this.http.delete(`${TODO_BACKEND_URL}/${todoId}`))
  );

  private readonly updateTodo$ = this.updateTodoSubject.pipe(
    tap((v) => console.log('update', v)),
    mergeMap((todo) =>
      this.http.patch(`${TODO_BACKEND_URL}/${todo.id}`, todo, {
        headers: HEADERS,
      })
    )
  );

  readonly todos$ = merge(
    of(null),
    this.addTodo$,
    this.deleteTodo$,
    this.updateTodo$
  ).pipe(
    tap(() => console.log('get todos')),
    switchMap(() => this.http.get<Todo[]>(TODO_BACKEND_URL))
  );

  addTodo(newTodo: NewTodo) {
    this.addTodoSubject.next(newTodo);
  }

  deleteTodo(id: Id) {
    this.deleteTodoSubject.next(id);
  }

  updateTodo(todo: Todo) {
    this.updateTodoSubject.next(todo);
  }
}
