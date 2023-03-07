import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { TodoControlsComponent } from '../app/components/todo-controls/todo-controls.component';
import { Todo } from '../app/model/todo';
import { TodoService } from '../app/services/todo.service';

class MockTodoService implements Partial<TodoService> {
  setAllDoneStatus$(done: boolean): Observable<number> {
    return of(1);
  }

  clearDone$(): Observable<number> {
    return of(1);
  }
}

export default {
  title: 'TodoApp/TodoControlsComponent',
  component: TodoControlsComponent,
  parameters: {
    docs: false,
  },
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="background-color: var(--blue-60); padding: 3em;">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<TodoControlsComponent> = (args: {}) => ({
  props: args,
});

class MockEmptyTodoService extends MockTodoService {
  todos$: Observable<Todo[]> = of([]);
}

export const EmptyTodos = Template.bind({});
EmptyTodos.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockEmptyTodoService }],
  }),
];

class MockSomeTodoService extends MockTodoService {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: false },
    { id: 3, title: 'c', done: true },
  ]);
}

export const SomeTodo = Template.bind({});
SomeTodo.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockSomeTodoService }],
  }),
];

class MockAllDoneTodoService extends MockTodoService {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: true },
    { id: 3, title: 'c', done: true },
  ]);
}

export const AllDone = Template.bind({});
AllDone.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockAllDoneTodoService }],
  }),
];

class MockAllTodoTodoService extends MockTodoService {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: false },
    { id: 2, title: 'b', done: false },
    { id: 3, title: 'c', done: false },
  ]);
}

export const AllTodo = Template.bind({});
AllTodo.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockAllTodoTodoService }],
  }),
];
