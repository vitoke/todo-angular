import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { TodoComponent } from '../app/components/todo/todo.component';
import { Todo } from '../app/model/todo';
import { TodoService } from '../app/services/todo.service';

class MockTodoService implements Partial<TodoService> {
  todos$: Observable<Todo[]> = of([]);
}

export default {
  title: 'TodoApp/TodoComponent',
  component: TodoComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="background-color: var(--blue-60); padding: 3em;">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<TodoComponent> = (args: {}) => ({
  moduleMetadata: {
    providers: [{ provide: TodoService, useClass: MockTodoService }],
  },
  props: args,
});

export const Normal = Template.bind({});
Normal.args = {
  todo: { id: 1, title: 'Add storybook components', done: false },
};

export const Done = Template.bind({});
Done.args = {
  todo: { id: 1, title: 'Add storybook components', done: true },
};
