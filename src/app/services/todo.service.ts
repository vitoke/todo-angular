import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TODO_BACKEND_URL } from '../config';
import { NewTodo, Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  // todos$ = this.http.get<Todo[]>(TODO_BACKEND_URL);
  todos$ = new BehaviorSubject<Todo[]>([]);

  newTodo$: Observable<any> | undefined = undefined;

  addTodo(newTodo: NewTodo) {
    console.log('add todo');
    // this.todos$ = combineLatest([
    //   this.http.post<Todo>(TODO_BACKEND_URL, newTodo, {
    //     headers: { 'Content-Type': 'application/json' },
    //   }),
    //   this.http.get<Todo[]>(TODO_BACKEND_URL),
    // ]).pipe(map((value) => value[1]));
    // this.todos$ = combineLatest([
    //   this.http.post<Todo>(TODO_BACKEND_URL, newTodo, {
    //     headers: { 'Content-Type': 'application/json' },
    //   }),
    //   this.http.get<Todo[]>(TODO_BACKEND_URL),
    // ]).pipe(map((value) => value[1]));
    this.http
      .post<Todo>(TODO_BACKEND_URL, newTodo, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe(() => {
        this.http
          .get<Todo[]>(TODO_BACKEND_URL)
          .subscribe((todos) => this.todos$.next(todos));
      });
  }
}
