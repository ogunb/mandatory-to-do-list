import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchAllTodos() {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`).toPromise();
  }

  createTodo(content: string) {
    return this.http.post<Todo>(`${this.apiUrl}/todos`, { content }).toPromise();
  }

  updateTodoStatus(id: string) {
    return this.http.put<Todo>(`${this.apiUrl}/todos/${id}`, { isDone: false }).toPromise();
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.apiUrl}/todos/${id}`).toPromise();
  }
}
