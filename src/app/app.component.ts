import { Component } from '@angular/core';

import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoControlsComponent } from './components/todo-controls/todo-controls.component';
import { TodoCounterComponent } from './components/todo-counter/todo-counter.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    AddTodoComponent,
    TodoListComponent,
    TodoCounterComponent,
    TodoControlsComponent,
  ],
})
export class AppComponent {}
