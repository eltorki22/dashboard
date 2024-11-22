import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, Subject, tap } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // http: HttpClient = inject(HttpClient);

  // toastr:ToastrService=inject(ToastrService)

  // signup(email: string, password: string) {
  //   const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDu-vJ5rcNoP4M1ul1s0Z30S5FqT3YPu8';
  //   const errorMessages = {
  //     EMAIL_EXISTS: 'This email is already in use by another account',
  //     OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
  //     TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later.',
  //     WEAK_PASSWORD:'Your password is too weak. Please choose a stronger password'
  //   };
  //   const signupPayload = { email:email, password:password ,returnSecureToken:true};
  //   return this.http.post(apiUrl, signupPayload).pipe(
  //     catchError((err) => {

  //             if(!err.error || !err.error.error){
  //       this.toastr.error('There is an unknown error','Error' )

  //       throw err
  //     }
  //       const errorMessage = errorMessages[err?.error?.error?.message];
  //       if (errorMessage) {
  //         this.toastr.error('Error', errorMessage);
  //       }
  //       console.error(err)
  //       throw err;
  //     })
  //   );
  // }

  // signIn(email:string,password:string){

  //   const signInPayload={email:email,password:password,returnSecureToken:true}
  //   const apiUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDu-vJ5rcNoP4M1ul1s0Z30S5FqT3YPu8'
  //   const msgError={
  //     EMAIL_NOT_FOUND:'There is no user record corresponding to this identifier. The user may have been deleted.',
  //     INVALID_PASSWORD:'The password is invalid or the user does not have a password.',
  //     USER_DISABLED:'The user account has been disabled by an administrator.'
  //   }

  //   return this.http.post(apiUrl,signInPayload).pipe(catchError((err)=>{

  //     if(!err.error || !err.error.error){
  //       this.toastr.error('There is an unknown error','Error' )

  //       throw err
  //     }

  //     const ErrorMsg=msgError[err.error.error.message];

  //     if(ErrorMsg){
  //       this.toastr.error(ErrorMsg,'error')
  //     }

  //   throw err
  //   }))

  http: HttpClient = inject(HttpClient);
  toastr: ToastrService = inject(ToastrService);
  route:Router=inject(Router)

  userSub = new BehaviorSubject<User>(null);

  private readonly apiKey = "AIzaSyCDu-vJ5rcNoP4M1ul1s0Z30S5FqT3YPu8";

  // رسالة الخطأ الافتراضية
  private errorMessages = {
    EMAIL_EXISTS: "This email is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER:
      "We have blocked all requests from this device due to unusual activity. Try again later.",
    WEAK_PASSWORD:
      "Your password is too weak. Please choose a stronger password.",
    EMAIL_NOT_FOUND:
      "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD:
      "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator.",
    UNKNOWN_ERROR: "There is an unknown error.",
  };

  private handleError(err: any) {
    if (!err.error || !err.error.error) {
      this.toastr.error(this.errorMessages.UNKNOWN_ERROR, "Error");
      throw err;
    }

    const errorMessage = this.errorMessages[err?.error?.error?.message];
    if (errorMessage) {
      this.toastr.error(errorMessage, "Error");
    }

    console.error(err);
    throw err;
  }

  // التسجيل (SignUp)
  signup(email: string, password: string) {
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    const signupPayload = { email, password, returnSecureToken: true };

    return this.http.post(apiUrl, signupPayload).pipe(
      catchError(this.handleError.bind(this)),
      tap((res) => {
        // بمجرد النقر سنحصل علي البيانات
        // console.log(res)
        // يعني تحول لساعه
        // console.log(res.expiresIn * 1000)
        // بيحسب وقت انتهاء الصلاحيه بناءا علي الوقت الحالي
        // ولما بجمهم بحصل الوقت اللي اريده اللي هو ساعه
        // يعني انا بجيب وقتي دلوقتي واحسب عليه ساعه زياده
        // const expiresTs=new Date().getTime() + res.expiresIn * 1000
        // ودي بتديني الوقت الفعلي اللي هو ساعه
        // const expiresIn=new Date(expiresTs)
        // console.log(expiresIn)
        // هاجي اجيب بيانات ال يوزر

        //ساعه زياده كده عملت يوزر اوبجكت علي حسب الكلاس وفي الاخر ضفت الاكسبرين فيه

        // const user = new User(res.email,res.localId,res.idToken,expiresIn)

        // ثم هنخزن في السابجكت

        // this.userSub.next(user);

        this.handleCreateUser(res);
      })
    );
  }

  // تسجيل الدخول (SignIn)
  signIn(email: string, password: string) {
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    const signInPayload = { email, password, returnSecureToken: true };

    return this.http.post(apiUrl, signInPayload).pipe(
      catchError(this.handleError.bind(this)),
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }

  private handleCreateUser(res: any) {
    var expiresTs = new Date().getTime() + res.expiresIn * 1000;
    var expiresIn = new Date(expiresTs);

    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.userSub.next(user);

    this.autoLogout(res.expiresIn * 1000)
  //  الجزء ده مهم جدا كان في مشكله 
    // localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify({
      email: user.email,
      id: user.id,
      _token: user.token,
      _expiresIn: expiresIn.toISOString(),  // تخزين الوقت بتنسيق ISO
  }));

  }





  // autoLogin(){
  //   const user=JSON.parse(localStorage.getItem('user')!)

  //   if(!user || !user.token ||  !user.expiresIn){
  //     return ;
  //   }
    
  //   const expiresIn = new Date(user.expiresIn).getTime(); // تحويل وقت الانتهاء إلى وقت مناسب
  // const currentTime = new Date().getTime(); 
  // let logginuser=new User(user.email,user.id,user._token,user.expiresIn);
  //   if(logginuser.token){
    
  //     if(logginuser.token){
  //       const timerval=expiresIn - currentTime


  //       if(timerval <=0){
  //         this.logout()
  //       }else{
  //         this.autologout(timerval)
  //         this.userSub.next(logginuser)
  //       }
  
  //     }
  //   }
  // }

  // private tokennum:any

  // logout() {
  //   this.userSub.next(null);
  //   this.route.navigate(['login'])
  //   localStorage.removeItem('user')

  //   if(this.tokennum){
  //     clearTimeout(this.tokennum)
  //   }
  //   this.tokennum=null
  // }



  // autologout(expireTime:number){
  

  //   // if(this.tokennum){
  //   //   clearTimeout(this.tokennum)
  //   // }

  //   this.tokennum=setTimeout(()=>{

  //     this.logout();
  //   },expireTime)



  // }

  private tokenExpiretimer: any;

  

logout(){
    this.userSub.next(null);
    this.route.navigate(['/login']);
    localStorage.removeItem('user');

    if(this.tokenExpiretimer){
        clearTimeout(this.tokenExpiretimer);
    }
    this.tokenExpiretimer = null;
}

autoLogin(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        return;
    }

    // const loggedUser = new User(user.email, user.id, user._token, user._expiresIn)

    // if(loggedUser.token){
    //     this.userSub.next(loggedUser);
    //     const timerValue = new Date(user._expiresIn).getTime() - new Date().getTime();
    //     this.autoLogout(timerValue);
    // }

// مع ده 
    const expiresInDate = new Date(user._expiresIn);
    const currentTime = new Date().getTime();
    const timerValue = expiresInDate.getTime() - currentTime;

    if (timerValue <= 0) {
      this.logout();  // تسجيل الخروج إذا انتهت الصلاحية
  } else {
      // إذا كانت صلاحية التوكن سارية
      const loggedUser = new User(user.email, user.id, user._token, expiresInDate);
      this.userSub.next(loggedUser);
      this.autoLogout(timerValue);  // ضبط مؤقت تسجيل الخروج بعد انتهاء التوكن
  }
}

autoLogout(expireTime: number){
    this.tokenExpiretimer = setTimeout(() => {
        this.logout();
    }, expireTime);
}

// private handleCreateUser(res){
//     const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
//     const expiresIn = new Date(expiresInTs);
//     const user = new User(res.email, res.localId, res.idToken, expiresIn);
//     this.user.next(user);
//     this.autoLogout(res.expiresIn * 1000);

//     localStorage.setItem('user', JSON.stringify(user));
// }
// private handleError(err){
//     let errorMessage = 'An unknown error has occured'
//     console.log(err);
//     if(!err.error || !err.error.error){
//         return throwError(() => errorMessage);
//     }
//     switch (err.error.error.message){
//         case 'EMAIL_EXISTS':
//             errorMessage ="This email already exists.";
//             break;
//         case 'OPERATION_NOT_ALLOWED':
//             errorMessage = 'This operation is not allowed.';
//             break;
//         case 'INVALID_LOGIN_CREDENTIALS':
//             errorMessage = 'The email ID or Password is not correct.';
//             break
//     }
//     return throwError(() => errorMessage);
// }
}
