import { Injectable } from '@angular/core';
//import {map} from 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { response } from 'express';
import {Task} from './task.model.js';
import {Observable,forkJoin} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$!: Observable<Task[]>;
  errorMessage: string = '';

  constructor(private http: HttpClient,public authService: AuthService) { }

  private serviceUrl = 'http://localhost:3000/api/tasks/';


  getTasks(token:string){
    const headers = { 'Authorization': 'Bearer ' + token };
    this.tasks$ = this.http.get<Task[]>(this.serviceUrl,{ headers })
    .pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return throwError(() => new Error(error));
    }));
    return this.tasks$;
  }

  getTask(id:string,token:string){
    const headers = { 'Authorization': 'Bearer ' + token };;
    console.log( 'getTask url='+this.serviceUrl+id);
    console.log("header="+ headers);
    let task = this.http.get<Task[]>(`${this.serviceUrl}/${id}`,{ headers }) .pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return throwError(() => new Error(error));
    }));
    return task;
  }

  getHeaders(){
    const headers = { 'Authorization': 'Bearer ' + this.authService.getToken() }
    return headers;
  }

  updateTask(id:string,task:Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.put<Task>('{this.serviceUrl}/id', task, { headers });
  }

  addTask(title: string,description: string,status: string){
    const headers = { 'Authorization': 'Bearer ' + this.authService.getToken() };
    let postId = '';
    let url = 'http://localhost:3000/api/tasks/';
    let body = {
      "title": title,
      "description": description,
      "status": status
    }
    console.log( "taskService|addTask|body="+JSON.stringify(body));
    console.log("token = " + 'Bearer ' + this.authService.getToken());
    this.http.post<any>(
      url, 
      {
        "title": title,
        "description": description,
        "status": status
      }, 
      { headers: headers }).pipe(
        catchError((error: any) => {
          this.errorMessage = error;
          console.log("error while adding="+ error);
          return throwError(() => new Error(error));
      })).subscribe(data => {
        postId = data.id;
    });
    console.log("postid="+postId);
  }

  deleteTask(id: string): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.delete<Task>(`${this.serviceUrl}/${id}`, { headers });
  }

  deleteTasks(tasks: Task[]): Observable<Task[]> {
    const headers = this.getHeaders();
    return forkJoin(
      tasks.map((task) =>
        this.http.delete<Task>(`${this.serviceUrl}/${task._id}`, { headers })
      )
    );
  }

}
