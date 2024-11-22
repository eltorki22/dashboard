import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {


  router:Router=inject(Router)
    auth:AuthService = inject(AuthService);
    user = this.auth.userSub
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
       
        return this.auth.userSub.pipe(
            take(1),  // التأكد من أنه يتم التعامل مع آخر حالة فقط
            map(user => {
              const loggedIn = user ? true : false;
              
              if (loggedIn) {
                return true;  // إذا كان المستخدم مسجلاً دخوله، سمح بالوصول
              } else {
                // إذا لم يكن المستخدم مسجلاً دخوله، قم بإعادة توجيهه إلى صفحة التسجيل
                return this.router.createUrlTree(['login']);
              }
            })
          );
        
    }
}
