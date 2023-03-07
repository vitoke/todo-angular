import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { AddTodoComponent } from '../app/components/add-todo/add-todo.component';
import { Todo } from '../app/model/todo';
import { TodoService } from '../app/services/todo.service';

class MockTodoService implements Partial<TodoService> {
  addTodo$(): Observable<Todo> {
    return of();
  }
}

export default {
  title: 'TodoApp/AddTodoComponent',
  component: AddTodoComponent,
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

const Template: Story<AddTodoComponent> = (args: {}) => ({
  moduleMetadata: {
    providers: [{ provide: TodoService, useClass: MockTodoService }],
  },
  props: args,
});

export const Normal = Template.bind({});
