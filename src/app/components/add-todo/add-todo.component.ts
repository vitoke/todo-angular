import { Component, inject } from '@angular/core';
import { NewTodo } from 'src/app/model/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title = '';

  private todoService = inject(TodoService);

  onTitleChange(event: Event) {
    if (!event.target) return;
    const target = event.target as HTMLInputElement;

    this.title = target.value;
  }

  onCreateTodo() {
    const newTodo: NewTodo = {
      title: this.title,
      done: false,
    };

    this.todoService.addTodo(newTodo);

    this.title = '';
  }
}
