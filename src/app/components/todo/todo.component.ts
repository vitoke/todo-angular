import { Component, inject, Input } from '@angular/core';

import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);

  @Input() todo!: Todo;

  onDeleteTodo(event: Event) {
    event.stopPropagation();
    this.todoService.deleteTodo(this.todo.id);
  }

  onToggleTodo() {
    this.todoService.updateTodo({ ...this.todo, done: !this.todo.done });
  }
}
