import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TodosService {
  private source: any;

  private parse() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  private updateTodos(todos) {
    this.source.next(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodos() {
    let observable: Observable<any> = Observable.create(source => {
      this.source = source;
      this.source.next(this.parse());
    });
    return observable;
  }

  createTodo(title) {
    const todos = this.parse();
    const todo = {
      'title': title,
      'completed': false
    };

    todos.push(todo);
    this.updateTodos(todos);
  }

  search(value: string) {
    const todos = this.parse();

    let result = todos.filter(item =>  {
      if(item.title.indexOf(value) >= 0 ) {
        return item;
      }
    });

    result.length ? result : result.push({search: 404});
    this.source.next(result);
  }

  toggleTodo(todo) {
    const todos = this.parse();
    let index = todos.map(item => item.title).indexOf(todo.title);

    todos[index]['completed'] = !todo.completed;
    this.updateTodos(todos);
  }

  toggleAll(state: boolean) {
    let todos = this.parse().map(item => {
      item.completed = state;
      return item;
    });

    this.updateTodos(todos);
  }

  deleteTodo(todo) {
    const todos = this.parse();
    let index = todos.map(item => item.title).indexOf(todo.title);

    todos.splice(index, 1);
    this.updateTodos(todos);
  }

  deleteAll() {
    this.updateTodos([]);
  }

  clearTodos() {
    let todos = this.parse().filter(item => item.completed === false);
    this.updateTodos(todos);
  }
}
