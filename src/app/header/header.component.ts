import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  isLogginIn=false;

  showDashboard:any;

  subscr!:Subscription

  auth:AuthService=inject(AuthService)

  route:Router=inject(Router);


  ngOnInit(){
    this.subscr=this.auth.userSub.subscribe((user)=>{
      this.isLogginIn=user ? true : false
      this.showDashboard=user ? true : false
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscr.unsubscribe();
  }


  onlogout(){
    this.auth.logout();
    this.route.navigate(['login'])
  }


}
