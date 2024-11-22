import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpInterceptorService } from './Services/http-interceptor.service';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';
// import {BrowserAnimationModule}
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-left'
      
    }
      
    ),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HttpInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
