import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Task } from '../models/Task';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {

  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  private taskSource = new BehaviorSubject<Task>({ id: 0, title: '', userId: 0, completed: false });
  newTask = this.taskSource.asObservable();
  private taskCountSource = new BehaviorSubject(200);
  taskCount = this.taskCountSource.asObservable();
  private editTaskSource = new BehaviorSubject<Task>({ id: 0, title: '', userId: 0, completed: false });
  editingTask = this.editTaskSource.asObservable();
  private updateTaskSource = new BehaviorSubject<Task>({ id: 0, title: '', userId: 0, completed: false });
  updatingTask = this.updateTaskSource.asObservable();

  constructor(
    public http: HttpClient
  ) { }

  emitNewTask(task: Task) {
    this.taskSource.next(task);
  }

  updateCount(length: number) {
    this.taskCountSource.next(length);
  }

  emitEditTask(task: Task) {
    this.editTaskSource.next(task);
  }

  emitUpdateTask(task: Task) {
    this.updateTaskSource.next(task);
  }

  getTasks() {
    return this.http.get(this.configUrl);
  }

  addTask(task: Task) {
    return this.http.post(this.configUrl, {
      body: task
    });
  }

  deleteTask(id: number) {
    return this.http.delete(this.configUrl + id);
  }

  editTask(task: Task) {
    return this.http.put(this.configUrl + task.id, {
      body: task
    });
  }
}
