import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tasks } from '../../models/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() public task: Tasks;
  @Output() taskUpdated = new EventEmitter();
  @Output() deleteTask = new EventEmitter();

  public statusChanged() {
    this.task.taskComplete = !this.task.taskComplete;
    this.taskUpdated.emit(this.task);
  }

  public deletedTask() {
    this.deleteTask.emit(this.task);
  }
}
