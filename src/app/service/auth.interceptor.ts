import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionstorageService } from './sessionstorage.service';

// export const myInterceptor: HttpInterceptorFn = (req, next) => {

//   if (req.url.includes("auth/login") || req.url.includes("auth/verify") ) {
//     req = req.clone({
//       headers: req.headers.set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8'),
//     })
//   }
//   // else if (this.loginSession != undefined) {
//   //   ////console.log("Setting Token")

//   //   //this.loader.isLoading.next(true);

//   //   req = req.clone({
//   //     headers: req.headers.set('Authorization', 'Bearer ' + this.loginSession)
//   //     .set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8')
//   //   })
//   // }

//   return next(req);
// };

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  userData:any;
  constructor(
   // private authService: AuthService,
    //private verfiyService: VerificationService,
    //private crypto: CryptoService,
    //private _SharedService: SharedService,
    //private _UserService: UserService,
    private _StorageService: SessionstorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.userData = this._StorageService.getUserData('loginsession');
    if (req.url.includes("auth/login") || req.url.includes("auth/verify")  || req.url.includes("user/user-unique") || req.url.includes("user/company-list") || req.url.includes("user/send-otp") || req.url.includes("user/user-create") ) {
        req = req.clone({
          setHeaders: {
            token: `22509F2AE7BA71E4C3FB32AB94B6CEA8`
          }
        });
    }

    else if (this.userData.authtoken != undefined) {
          req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.userData?.authtoken)
            .set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8')
          })
    }

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(req);
  }
}
