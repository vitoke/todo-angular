import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [CommonModule, TodoComponent],
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  constructor() {}

  readonly todos$ = this.todoService.todos$;
}
