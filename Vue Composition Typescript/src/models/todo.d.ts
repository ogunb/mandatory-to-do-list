export interface Todo {
  [key: string]: any; // piana doesn't expose StateTreeArray soooo...
  content: string;
  id: string;
  isDone: boolean;
}
