import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Tasks } from '../../models/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  set task(task: Tasks) {
    this._task = task;
  }

  @Output() taskUpdated = new EventEmitter();
  @Output() deleteTask = new EventEmitter();

  private _task: any;

  constructor() { }

  ngOnInit() {

  }

  /*public statusChanged() {
    this.taskUpdated.emit(this.task);
  }

  public deletedTask() {
    this.deleteTask.emit(this.task);
  }*/
}
