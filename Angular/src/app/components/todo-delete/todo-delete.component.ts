import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.css']
})
export class TodoDeleteComponent {
  @Input() id: string;
  @Output() deletedTodo = new EventEmitter();
}
