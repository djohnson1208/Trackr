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
    try {
      let response = await this._client.get(`${this.apiString}GetTasks`).toPromise();
      return response as Tasks[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getTaskById(id: number) {
    try {
      let response = await this._client.get(`${this.apiString}GetTask/${id}`).toPromise();
      return response as Tasks;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async updateTask(task: Tasks) {
    try {
      let response = await this._client.post<Tasks>(`${this.apiString}UpdateTask`, task, this.httpOptions).toPromise();
      return response as Tasks;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async createTask(task: Tasks) {
    try {
      let response = await this._client.post<Tasks>(`${this.apiString}CreateTask`, task, this.httpOptions).toPromise();
      return response as Tasks;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async deleteTask(task: Tasks) {
    try {
      let response = await this._client.post<Tasks>(`${this.apiString}DeleteTask`, task, this.httpOptions).toPromise();
      return response as Tasks;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async deleteCollectionOfTasks(tasks: Tasks[]) {
    try {
      let response = await this._client.post<Tasks[]>(`${this.apiString}DeleteMatchingTasks`, tasks, this.httpOptions).toPromise();
      return response as Tasks[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
