import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';

import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    todos: Todo[] = [];

    constructor(private todoService: TodoService) { }

    ngOnInit() {
      this.getTodos();
    }

    async getTodos() {
      const todos: Todo[] = await this.todoService.fetchAllTodos();
      this.todos = todos;
    }

    removeTodoItem(index: number) {
      this.todos.splice(index, 1);
    }

    trackByTodoId(index: number, todo: Todo): string {
      return todo.id;
    }
}
