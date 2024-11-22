import { Component, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../Services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  auth: AuthService = inject(AuthService);



  route:Router=inject(Router)
  toast:ToastrService=inject(ToastrService)
  isModeForm=true;

  onSwitchMode(){
    this.isModeForm=!this.isModeForm
  }

  onSub(f: any) {
    // console.log(f.value)

    // setTimeout(()=>{
      if (f.valid) {

        var email = f.value.email;
        var password = f.value.password;
  
        if(this.isModeForm){
          // Login In
  
          this.auth.signIn(email,password).subscribe((data)=>{
            this.toast.success(' Login request has been sent successfully!','Success')
            this.route.navigate(['dashboard'])
                    })
  
        
  
        }else{
  
          //sign Up
  
          // Login request has been sent successfully!
  
          this.auth.signup(email, password).subscribe({
            
            
            next: (data: any) => {
              this.toast.success('Your account has been created successfully!','success')
              console.log(data);
              this.route.navigate(['dashboard'])
            }
          });
  
  
          
  
        }
       
      }else{
        this.toast.error('Error','Error')
      }
    // },2000)
  
  
  

    
  }


  onlogout(){
    this.auth.logout();
  }
}
