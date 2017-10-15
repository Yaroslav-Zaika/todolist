import { Component } from '@angular/core';
import { TodosService } from '../shared/todo.service';

@Component({
  selector: 'todo-form-root',
  templateUrl: 'todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})

export class TodoFormComponent {
  constructor(public todosService: TodosService) {}

  create(value: string) {
    value.length ? this.todosService.createTodo(value) : '' ;
  }
}
