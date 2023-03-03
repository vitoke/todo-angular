import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private todoService = inject(TodoService);

  todos$ = this.todoService.todos$.pipe(tap(console.log));
}
