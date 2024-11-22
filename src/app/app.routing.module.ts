import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CanActivateGuard } from "./Services/auth.guard";




const routes:Routes=[
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[CanActivateGuard]},
    {path:'**',redirectTo:'login',pathMatch:'full'},
   

]


@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{

}