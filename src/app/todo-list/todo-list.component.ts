import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TodosService } from '../shared/todo.service';

@Component({
  selector: 'todo-list-root',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: any[];
  private subscribe: Subscription;
  private link: string;
  private state: boolean = false;
  private isEmpty: boolean;
  private isCompleted: boolean;

  constructor(public todosService: TodosService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscribe = this.activatedRoute.paramMap.subscribe(params=> {
      this.link = params.get('link');
      this.getTodos();
    });
  }

  getTodos() {
    this.todosService.getTodos().subscribe(params => {

      if(this.link == 'active') {
        this.todos = params.filter(todo => todo.completed == false);
      } else if(this.link == 'completed') {
        this.todos = params.filter(todo => todo.completed == true);
      } else {
        this.todos = params;
      }

      this.isEmpty = this.todos ? false : true;
      this.isCompleted = params.filter(todo => todo.completed == true) ? true : false;

      return this;
    });
  }

  search(value: string) {
    this.todosService.search(value);
  }

  toggle(todo) {
    this.todosService.toggleTodo(todo);
  }

  toggleAll(state: boolean) {
    this.todosService.toggleAll(state);
  }

  delete(todo) {
     this.todosService.deleteTodo(todo);
  }

  deleteAll() {
    this.todosService.deleteAll();
  }
  clear() {
    this.todosService.clearTodos();
  }
}
