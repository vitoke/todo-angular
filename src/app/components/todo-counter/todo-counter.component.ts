import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-counter',
  templateUrl: './todo-counter.component.html',
  styleUrls: ['./todo-counter.component.css'],
})
export class TodoCounterComponent {
  private readonly todoService = inject(TodoService);

  readonly amountTodo$ = this.todoService.todos$.pipe(
    map((todos) =>
      todos.reduce((amount, todo) => (todo.done ? amount : amount + 1), 0)
    )
  );
}
