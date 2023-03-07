import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewTodo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
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
