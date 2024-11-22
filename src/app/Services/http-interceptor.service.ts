import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  catchError,
  exhaustAll,
  exhaustMap,
  Observable,
  take,
  tap,
} from "rxjs";
import { HandleErrorService } from "./handle-error.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  auth: AuthService = inject(AuthService);
  // auth: AuthService = inject(AuthService);
  // HandleError: HandleErrorService = inject(HandleErrorService);
  HandleError: HandleErrorService = inject(HandleErrorService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // {setHeaders:{
    //   'Auth':'Sherif yehia'
    // // }}

    // this.auth.userSub.pipe(take(1),exhaustMap(user=>{
    //   const  modify=req.clone({params:new HttpParams().set('auth',user.token)})

    // }))

    //   return next.handle(modify).pipe(tap((event)=>{
    //     if(event.type == HttpEventType.Response){
    //       console.log('Event Torki')
    //       console.log(event.body)
    //     }
    //   }),catchError(((error)=>{
    //     this.HandleError.hangleError(error);
    //     throw error
    //   })));

  

    // نستخدم userSub للحصول على التوكن المستخدم
  //   return this.auth.userSub.pipe(
  //     take(1), // أخذ أول قيمة فقط
  //     exhaustMap((user) => {
  //       // التأكد من وجود التوكن
  //       if (!user || !user.token) {
  //         throw new Error("No user token found");
  //       }

  //       // تعديل الطلب بإضافة التوكن في المعاملات
  //       const modify = req.clone({
  //         params: new HttpParams().set("auth", user.token),
  //         // headers
  //       });

  //       // إرجاع الـ Observable المعدل
  //       return next.handle(modify);
  //     }),
  //     tap((event) => {
  //       if (event.type === HttpEventType.Response) {
  //         console.log("Event Torki");
  //         console.log(event.body);
  //       }
  //     }),
  //     catchError((error) => {
  //       // التعامل مع الأخطاء باستخدام خدمة HandleError
  //       this.HandleError.hangleError(error);
  //       // return throwError(() => new Error(error)); // إعادة رمي الخطأ بعد معالجته
  //       throw error
  //     })
  //   );
  // }\

  return this.auth.userSub.pipe(take(1), exhaustMap(user => {
    if(!user){
        return next.handle(req);
    }
    const modifiedReq = req.clone({
        params: req.params.set('auth', user.token
    )})
    return next.handle(modifiedReq).pipe(tap((event)=>{
          if(event.type == HttpEventType.Response){
            console.log('Event Torki')
            console.log(event.body)
          }
        }),catchError(((error)=>{
          this.HandleError.hangleError(error);
          throw error
        })));


  
}));
}

  
}
