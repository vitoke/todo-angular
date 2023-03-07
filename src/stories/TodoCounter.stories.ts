import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { Observable, of } from 'rxjs';

import { TodoCounterComponent } from '../app/components/todo-counter/todo-counter.component';
import { Todo } from '../app/model/todo';
import { TodoService } from '../app/services/todo.service';

export default {
  title: 'TodoApp/TodoCounterComponent',
  component: TodoCounterComponent,
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

const Template: Story<TodoCounterComponent> = (args: {}) => ({
  props: args,
});

class MockTodoServiceNoTodos implements Partial<TodoService> {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: true },
    { id: 3, title: 'c', done: true },
  ] as Todo[]);
}

export const NothingToDo = Template.bind({});
NothingToDo.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockTodoServiceNoTodos }],
  }),
];

class MockTodoServiceOneTodo implements Partial<TodoService> {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: true },
    { id: 2, title: 'b', done: true },
    { id: 3, title: 'c', done: false },
  ] as Todo[]);
}

export const OneThingToDo = Template.bind({});
OneThingToDo.decorators = [
  moduleMetadata({
    providers: [{ provide: TodoService, useClass: MockTodoServiceOneTodo }],
  }),
];

class MockTodoServiceMultipleTodo implements Partial<TodoService> {
  todos$: Observable<Todo[]> = of([
    { id: 1, title: 'a', done: false },
    { id: 2, title: 'b', done: false },
    { id: 3, title: 'c', done: false },
  ] as Todo[]);
}

export const ALotToDo = Template.bind({});
ALotToDo.decorators = [
  moduleMetadata({
    providers: [
      { provide: TodoService, useClass: MockTodoServiceMultipleTodo },
    ],
  }),
];
