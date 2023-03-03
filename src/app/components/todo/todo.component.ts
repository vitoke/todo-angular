import { Component, inject, Input } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  @Input() todo!: Todo;

  onDeleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }
}
