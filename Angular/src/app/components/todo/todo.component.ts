import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo: Todo;
  @Input() index: number;
  @Output() deletedTodo = new EventEmitter();

  constructor(private todoService: TodoService) { }

  async handleIsDone(id: string) {
    try {
      await this.todoService.updateTodoStatus(id);
      this.todo.isDone = !this.todo.isDone;
    } catch (e) {
      console.error(e);
    }
  }

  async handleTodoDelete(theListWrapper: HTMLInputElement) {
    theListWrapper.style.animation = 'slideOut 1s forwards';
    theListWrapper.addEventListener('animationend', emitDeletedEvent.bind(this));
    async function emitDeletedEvent() {
      theListWrapper.removeEventListener('animationend', emitDeletedEvent);
      try {
        await this.todoService.deleteTodo(this.todo.id);
        this.deletedTodo.emit(this.index);
      } catch (e) {
        theListWrapper.style.animation = 'slideIn 500ms ease-out forwards 1';
      }
    }
  }
}
