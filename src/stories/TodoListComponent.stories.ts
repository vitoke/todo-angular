import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { TodoListComponent } from '../app/components/todo-list/todo-list.component';
import { Todo } from '../app/model/todo';
import { TodoService } from '../app/services/todo.service';

export default {
  title: 'TodoApp/TodoListComponent',
  component: TodoListComponent,
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

const Template: Story<TodoListComponent> = (args: {}) => ({
  props: args,
});

class MockTodoServiceNoTodos implements Partial<TodoService> {
  updateTodo$(todo: Todo): Observable<any> {
    return of(1);
  }

  deleteTodo$(todoId: number): Observable<Object> {
    return of(1);
  }

  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'Create todo app', done: true },
    { id: 2, title: 'Write stories', done: true },
    { id: 3, title: 'Rule the world', done: false },
  ] as Todo[]);
}

export const Default = Template.bind({});
Default.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockTodoServiceNoTodos }],
  }),
];
