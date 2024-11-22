import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private toast:ToastrService) { }




  hangleError(error:HttpErrorResponse){
    switch(error.status){
      case 401:
        this.toast.error('Error',"You are not authorized to access this page. You may need to log in")
        break;
      case 404:
        this.toast.error('Error',"The Page is Not Found")
        break;
      case 500:
        this.toast.error('Error',"An internal server error has occurred. Please try later.")
        break
      case 0:
        if(!navigator.onLine){
this.toast.error('Error','There is a problem in the Internet') 
        }
        break;
      default:
        // في حالة وجود خطأ غير معروف
       this.toast.error("Error",`An error occurred: ${error.message}`)
        break;
    }
  }



  
}
