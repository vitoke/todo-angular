import { Component, inject } from '@angular/core';

import { NewTodo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  private readonly todoService = inject(TodoService);

  title = '';

  onCreateTodo() {
    if (!this.title) {
      return;
    }

    const newTodo: NewTodo = {
      title: this.title,
      done: false,
    };

    this.todoService.addTodo$(newTodo).subscribe();

    this.title = '';
  }
}
