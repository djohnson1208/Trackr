import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasks } from '../models/tasks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private readonly apiString = '/api/task/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _client: HttpClient) { }

  public async getAllTasks() {
    //return this._client.get(`${this.apiString}GetTasks`).toPromise().then(response => response as Tasks);
    try {
      let response = await this._client.get(`${this.apiString}GetTasks`)
        .toPromise();
      return response as Tasks[];
    } catch (error) {
      console.log(error);
    }
  }

  public getTaskById(id: number) {
    return this._client.get(`${this.apiString}GetTask/${id}`).toPromise();
  }

  public updateTask(task: Tasks) {
    return this._client.post<Tasks>(`${this.apiString}UpdateTask`, task, this.httpOptions).toPromise();
  }

  public createTask(task: Tasks) {
    return this._client.post<Tasks>(`${this.apiString}CreateTask`, task, this.httpOptions).toPromise();
  }

  public deleteTask(id: number) {
    return this._client.post<number>(`${this.apiString}DeleteTask`, id, this.httpOptions).toPromise();
  }
}
