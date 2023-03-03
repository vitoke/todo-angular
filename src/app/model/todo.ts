export type Id = number;

export interface Todo {
  id: Id;
  title: string;
  done: boolean;
}

export type NewTodo = Omit<Todo, 'id'>
