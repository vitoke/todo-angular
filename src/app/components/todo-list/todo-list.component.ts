import { Component, inject } from '@angular/core';

import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  readonly todos$ = this.todoService.todos$;
}
