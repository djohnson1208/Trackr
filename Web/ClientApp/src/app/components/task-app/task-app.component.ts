import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-app',
  templateUrl: './task-app.component.html',
  styleUrls: ['./task-app.component.scss']
})
export class TaskAppComponent implements OnInit {

  public tasks: Tasks[];
  public unfilteredTasks: Tasks[];

  constructor(private taskService: TaskService) { }

  async ngOnInit() {
    this.readTasksFromServer();
  }

  public async createTask() {
    let id: number;
    let name: string;
    let description: string;
    let task: Tasks = new Tasks();
    id = Math.floor(Math.random() * 1000000);
    name = prompt("Please enter a task name");
    if (name == '' || name == null) {
      alert('Task name cannot be left blank.');
      return;
    }
    description = prompt("Please enter a task description, if any");
    task.TaskId = id;
    task.TaskName = name;
    task.TaskDescription = description;
    task.TaskComplete = false;
    const result = await this.taskService.createTask(task);
    if (result == null) {
      alert("There was an error when creating the new task. Please try again later.");
    }
    this.readTasksFromServer();
  }

  public async deleteTask(task: Tasks) {
    let result = await this.taskService.deleteTask(task);
    if (result == null) {
      alert("There was an error when deleting the task. Please try again later.");
    }
    this.readTasksFromServer();
  }

  public async deleteCompletedTasks() {
    let temp = this.tasks.filter((val) => { return val.TaskComplete});
    console.log(temp);
    let result = await this.taskService.deleteCollectionOfTasks(temp);
    if (result == null) {
      alert("There was an error when deleting the task. Please try again later.");
    }
    this.readTasksFromServer();
  }

  public async updateTaskStatus(task: Tasks) {
    console.log(task);
    
    let result = await this.taskService.updateTask(task);
    if (result == null) {
      alert("There was an error when updating the task. Please try again later.");
    }
    this.readTasksFromServer();
  }

  public async readTasksFromServer() {
    this.tasks = await this.taskService.getAllTasks();
    this.tasks.sort();
  }

  public selectViewType(event: any) {
    if (this.unfilteredTasks == null) {
      this.unfilteredTasks = this.tasks.slice(0);
    }
    console.log(event.target.value);
    switch (event.target.value) {
      case 'Active':
        this.tasks = this.unfilteredTasks.filter((val) => { return !val.TaskComplete });
        break;
      case 'Complete':
        this.tasks = this.unfilteredTasks.filter((val) => { return val.TaskComplete });
        break;
      case 'All':
        this.tasks = this.unfilteredTasks;
        this.unfilteredTasks = null;
        break;
    }
  }
}
