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

  constructor(private taskService: TaskService) { }

  async ngOnInit() {
    this.tasks = await this.taskService.getAllTasks();
  }
}
