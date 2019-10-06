import { Component, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.css']
})
export class TodoNewComponent {
  newTodo: string;
  isCreating = false;
  @Output() createdTodo = new EventEmitter();

  constructor(private todoService: TodoService) { }

  async createNewTodo() {
    this.isCreating = true;
    try {
      await this.todoService.createTodo(this.newTodo);
      this.createdTodo.emit();
    } finally {
      this.newTodo = '';
      this.isCreating = false;
    }
  }
}
