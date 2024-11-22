import { Component, OnInit, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormTask } from "../models/FormTask";
import { TaskService } from "../Services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;

  showTaskDetails: boolean = false;
  TaskServices: TaskService = inject(TaskService);

  DetailsData:any=[];

  UpdateId: any;
  EditMode = false;
  selectTask: any;

  showloading = false;
  DataTasks: any[] = [];
  OpenCreateTaskForm() {
    this.EditMode = false;
    this.showCreateTaskForm = true;
    this.selectTask = [];
  }

  CloseCreateTaskForm() {
    this.EditMode = false;
    this.showCreateTaskForm = false;
    this.selectTask = [];
  }

  ngOnInit(): void {
    this.getAllData();
    // this.showloading=false
  }

  // Send Data
  onSubmit(val: FormTask) {
    this.showloading = true;

   
    if (this.EditMode == false) {
      this.TaskServices.SendTaskData(val).subscribe((data) => {
        // console.log(data);
        this.getAllData();
        this.showloading = false;
        this.CloseCreateTaskForm();
      });
    } else {
      this.showloading = true;
      this.TaskServices.updateData1(this.UpdateId, val).subscribe((data) => {
        // console.log(data)
        this.getAllData();
        this.showloading = false;
        this.CloseCreateTaskForm();
      });
    }
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Get Data
  getAllData() {
    this.showloading = true;
    this.TaskServices.FetchAllTaskData().subscribe((data) => {
      this.DataTasks = data;
      this.showloading = false;
      console.log(this.DataTasks);
    });
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Get Data 2 Optional
  // FetchTasks(){

  //   this.getAllData();
  // }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Delete All Tasks

  clearTasks() {
    this.showloading = true;
    this.TaskServices.clearAllTasks().subscribe((data) => {
      console.log("Yes Delete All Data");
      this.showloading = false;
      this.getAllData();
    });
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // Delete Task 1
  deleteTask(id: any) {
    this.showloading = true;
    this.TaskServices.deleteTask1(id).subscribe((data) => {
      console.log("Delete Task 1");
      this.showloading = false;
      this.getAllData();
    });
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Update Task

  updateTask(id: any, Task: any) {
    this.OpenCreateTaskForm();
    this.EditMode = true;
    this.selectTask = this.DataTasks.find((x) => {
      return x.id == id;
    });
    this.UpdateId = id;
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // Show Details

  openDetails(){
    this.showTaskDetails=true
  }

  closeDetails(){
    this.showTaskDetails=false
  }

  showDetails(id: any) {
    this.openDetails();

    this.TaskServices.showDetails(id).subscribe((data:any)=>{
      this.DetailsData=data
    })
    

  }
}
