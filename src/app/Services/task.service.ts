import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map } from "rxjs";
import { environment } from "src/environment/envirnoment";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {


  auth:AuthService=inject(AuthService)
  userSubj=this.auth.userSub;
  constructor(private http: HttpClient, private toast:ToastrService) {}

  // ببعت الداتا
  SendTaskData(data: any) {
    // الطريقه الاولي
    const headers = new HttpHeaders({
      "content-type": "application/json",
      "my-Header": "Hello World",
    });

    // الطريقه الثانيه

    let params=new HttpParams();
    params=params.set('page','10')
    params=params.set('item','20')
  
    
    return this.http
      .post(environment.baseApi + ".json", data, { headers: headers,params:params })
      .pipe(
        catchError((error) => {
          this.toast.error('Error',error.message)
          throw error;
        })
      );
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // بجيب الداتا

  FetchAllTaskData() {


    // this.auth.userSub.subscribe((user)=>{
    //   // console.log(user)
      
    // })



    return this.http.get(environment.baseApi + ".json").pipe(
      map((res) => {
        let tasks = [];

        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            tasks.push({ ...res[key], id: key });
          }
        }

        return tasks;
      })
    ,catchError((error)=>{
      this.toast.error('Error',error.message)
      throw Error
    }));




  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Clear All Tasks

  clearAllTasks() {
    return this.http.delete(environment.baseApi + ".json").pipe(catchError((error)=>{
      this.toast.error('Error',error.message)
      throw error
    }));
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // Delete Task one

  deleteTask1(id: any) {
    return this.http.delete(environment.baseApi + "/" + id + ".json").pipe(catchError((error)=>{

      this.toast.error('Error',error.message)
      throw error
    }));
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // UpdateData1

  updateData1(id: any, data: any) {
    return this.http.put(environment.baseApi + "/" + id + ".json", data).pipe(catchError((error)=>{

      this.toast.error('Error',error.message)
      throw error
    }));
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Show Details

  showDetails(id: any) {
    return this.http.get(environment.baseApi + "/" + id + ".json").pipe(catchError((error)=>{
      this.toast.error('Error',error.message)
      throw error
    }));
  }
}
