import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-app',
  templateUrl: './task-app.component.html',
  styleUrls: ['./task-app.component.scss']
})
export class TaskAppComponent implements OnInit {

  public tasks: any;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks().then((response) => {
      this.tasks = response as Tasks;
    },
      (err) => {
        console.log(err);
      });
  }

}
