import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  concatAll,
  concatMap,
  count,
  filter,
  first,
  map,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { TODO_BACKEND_URL } from '../config';

import { Id, NewTodo, Todo } from '../model/todo';

const HEADERS = { 'Content-Type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  // subject used to notify that a change has been made on the server
  private readonly _refreshTodosSubject = new Subject<void>();

  // observable with the latest array of todos from the server
  readonly todos$ = this._refreshTodosSubject.pipe(
    // we need an initial event to load the data at the start
    startWith(null),
    map((_, index) => index),
    tap((index) => console.log(`get todos #${index}`)),
    // switchMap because we always want to load only the latest version when a refresh is received.
    switchMap(() => this.http.get<Todo[]>(TODO_BACKEND_URL)),
    // prevent unnecessary reloads when multiple subscribers
    shareReplay(1)
  );

  addTodo$(newTodo: NewTodo) {
    return this.http
      .post<Todo>(TODO_BACKEND_URL, newTodo, {
        headers: HEADERS,
      })
      .pipe(
        // notify change
        tap(() => this._refreshTodosSubject.next())
      );
  }

  private deleteTodoInternal$(todoId: Id) {
    return this.http.delete(`${TODO_BACKEND_URL}/${todoId}`);
  }

  deleteTodo$(todoId: Id) {
    return this.deleteTodoInternal$(todoId).pipe(
      // notify change
      tap(() => this._refreshTodosSubject.next())
    );
  }

  private updateTodoInternal$(todo: Todo) {
    return this.http.patch<any>(`${TODO_BACKEND_URL}/${todo.id}`, todo, {
      headers: HEADERS,
    });
  }

  updateTodo$(todo: Todo) {
    return this.updateTodoInternal$(todo).pipe(
      // notify change
      tap(() => this._refreshTodosSubject.next())
    );
  }

  setAllDoneStatus$(done: boolean) {
    return this.todos$.pipe(
      // we only need the latest status
      first(),
      // keep only the todos whose done status needs an update
      map((todos) => todos.filter((todo) => todo.done !== done)),
      // if no todos need an update, skip event
      filter((todos) => todos.length > 0),
      // unpack array of todos to each individual todo
      concatAll(),
      // perform update for each todo
      // use internal method to prevent unneccesary updates
      concatMap((todo) => this.updateTodoInternal$({ ...todo, done })),
      // convert all events into one event
      count(),
      // notify change
      tap(() => this._refreshTodosSubject.next())
    );
  }

  clearDone$() {
    return this.todos$.pipe(
      // we only need the latest status
      first(),
      // keep only todos that are done
      map((todos) => todos.filter((todo) => todo.done)),
      // if no todos are done, skip event
      filter((todos) => todos.length > 0),
      // unpack array of todos to each individual todo
      concatAll(),
      // delete each todo
      // use internal method to prevent unneccesary updates
      concatMap((todo) => this.deleteTodoInternal$(todo.id)),
      // convert all events into one event
      count(),
      // notify change
      tap(() => this._refreshTodosSubject.next())
    );
  }
}
