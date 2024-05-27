import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';
import {Task} from './task.model.js';
import {Observable,of, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators'
import { Router  } from '@angular/router';
import {NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  isAdd: Boolean = false;
  isEdit: Boolean = false;
  isDefault: Boolean = true;

  title = 'PtClient';
  tasks$!: Observable<Task[]>;
  taskDatasource: MatTableDataSource<Task>;
  taskColumns: string[] = ['title', 'description', 'status', 'delete row'];
 
  form: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  addForm: FormGroup = this.fb.group({
    title: [''],
    description: [''],
    status: [''],
  });

  constructor(
    private fb: FormBuilder, 
    public authService: AuthService,
    public taskService: TaskService,
    private router: Router
  ){

    this.taskDatasource = new MatTableDataSource<Task>();
    this.taskColumns = ['title', 'description', 'status', 'edit row', 'delete row'];
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
          this.authService.logout();
      }
    });
  }



  submit(){

    this.authService
      .login(this.form.value.email,this.form.value.password)
      .subscribe((response)=>{
        this.taskService.getTasks(this.authService.getToken())
        .subscribe(tasks => {
          this.taskDatasource.data = tasks;
        });
      });
      }


      addTask(){
        //const id = (event.target as HTMLInputElement).id;
        //let temp = id.split('-');
        //let taskId = temp[1];
        console.log("add task called"+this.addForm.value.title+"|"+
        this.addForm.value.description + "|" + this.addForm.value.status);

        this.taskService
        .addTask(
          this.addForm.value.title,
          this.addForm.value.description,
          this.addForm.value.status
        );
        
        this.taskService.getTasks(this.authService.getToken())
          .subscribe(tasks => {
            this.taskDatasource.data = tasks;
          });
        this.isDefault=true;
        this.isEdit=false;
        this.isAdd=false;
      }

    
     onSelected() {
      console.log("from select box ");

      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.taskDatasource.filter = filterValue.trim().toLowerCase();
      }

      deleteTask(event: Event){
        const id = (event.target as HTMLInputElement).id;
        let temp = id.split('-');
        let taskId = temp[1];
        console.log("taskId="+taskId);
        this.taskService.deleteTask(taskId)
        .subscribe(
          (data)=> {this.taskService.getTasks(this.authService.getToken())
            .subscribe(tasks => {
              this.taskDatasource.data = tasks;
            });},
        );
      }

      editTask(event: Event){
        const id = (event.target as HTMLInputElement).id;
        let temp = id.split('-');
        let taskId = temp[1];
        console.log("edit called,taskId="+taskId);
        this.isDefault=false;
        this.isEdit=true;
        var task = this.taskService.getTask(taskId,this.authService.getToken());
        console.log("task from edittask="+task);
        console.log(JSON.stringify(task));
      }

      updateTask(event: Event){
        //const id = (event.target as HTMLInputElement).id;
        //let temp = id.split('-');
        //let taskId = temp[1];
        console.log("update called");
        this.isDefault=true;
        this.isEdit=false;
      }

      addRow(event: Event){
        //const id = (event.target as HTMLInputElement).id;
        //let temp = id.split('-');
        //let taskId = temp[1];
        console.log("add row called");
        this.isDefault=false;
        this.isEdit=false;
        this.isAdd=true;
      }

    


}
