import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-controls',
  templateUrl: './todo-controls.component.html',
  styleUrls: ['./todo-controls.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TodoControlsComponent {
  private readonly todoService = inject(TodoService);

  readonly disableClearDone$ = this.todoService.todos$.pipe(
    map((todos) => todos.every((todo) => !todo.done))
  );

  disableSetAllDoneStatus$(done: boolean) {
    return this.todoService.todos$.pipe(
      map((todos) => !todos.some((todo) => todo.done !== done))
    );
  }

  setAllDone(done: boolean) {
    this.todoService.setAllDoneStatus$(done).subscribe();
  }

  clearDone() {
    this.todoService.clearDone$().subscribe();
  }
}
