import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);

  @Input() todo!: Todo;

  onDeleteTodo(event: Event) {
    event.stopPropagation();
    this.todoService.deleteTodo$(this.todo.id).subscribe();
  }

  onToggleTodo() {
    this.todoService
      .updateTodo$({ ...this.todo, done: !this.todo.done })
      .subscribe();
  }
}
