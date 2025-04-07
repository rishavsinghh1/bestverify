import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionstorageService } from './sessionstorage.service';
import Swal from 'sweetalert2';
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  userData:any;
  constructor(
    private _StorageService: SessionstorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userData = this._StorageService.getUserData('loginsession');
    if (req.url.includes("auth/login") || req.url.includes("auth/verify")  || req.url.includes("user/user-unique") || req.url.includes("user/company-list") || req.url.includes("user/send-otp") || req.url.includes("user/user-create") || req.url.includes("auth/forgot-password")) { 
      req = req.clone({
        setHeaders: {
          token: `22509F2AE7BA71E4C3FB32AB94B6CEA8`
        }
      });
    } else if (this.userData && this.userData.authtoken) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.userData.authtoken)
          .set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8')
      });
    } else {
      req = req.clone({
        headers: req.headers.set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8')
      });
    }

    if (req.url.includes("auth/logout")) {
      // Clear the user data and redirect to the login page
      this._StorageService.clearUserData('loginsession');
      // Redirect to the login page
      window.location.href = '/login';
    }

    return new Observable(observer => {
      const subscription = next.handle(req).subscribe({
        next: (event) => { 
          if (event instanceof HttpResponse) {
            if (event.status !== 400) {
              console.log('event >>>', event);
              observer.next(event);
            } else {
              console.log('new event >>>', event);
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: JSON.stringify(event.body.errors) ?? event.body.message
              });
            }
          }
        },
        error: (err) => {
          console.log('11new event >>>', err);
          console.log('11new event >>>', err.error.errors);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: JSON.stringify(err.error.errors) ?? err.error.message
          });
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }
}


// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   this.userData = this._StorageService.getUserData('loginsession')  || {};

//   const excludedUrls = [
//     "auth/login",
//     "auth/verify",
//     "user/user-unique",
//     "user/company-list",
//     "user/send-otp",
//     "user/user-create",
//     "auth/forgot-password",
//     "auth/user-forgot-password"
//   ];

//   const headers :any = {
//     token: '22509F2AE7BA71E4C3FB32AB94B6CEA8'
//   };
  
//   if (this.userData && this.userData.authtoken) {
//     headers.set('Authorization', `Bearer ${this.userData.authtoken}`); 
//   }

  
//   if (excludedUrls.some(url => req.url.includes(url))) {
//     req = req.clone({ headers });
//   } else {
//     req = req.clone({ headers });
//   }
//   console.log(headers);
//   return next.handle(req).pipe(
//     tap(event => {
//       if (event instanceof HttpResponse) {
//         console.log('event >>>', event);
//       }
//     }),
//     catchError(err => {
//       console.log('Error:', err); 
//       return throwError(err);
//     })
//   );
// }