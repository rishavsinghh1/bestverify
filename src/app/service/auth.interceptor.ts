import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export const myInterceptor: HttpInterceptorFn = (req, next) => {
 
  if (req.url.includes("auth/login") ) {
    req = req.clone({
      headers: req.headers.set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8'),
    }) 
  } 
  // else if (this.loginSession != undefined) {
  //   ////console.log("Setting Token")

  //   //this.loader.isLoading.next(true);

  //   req = req.clone({
  //     headers: req.headers.set('Authorization', 'Bearer ' + this.loginSession)
  //     .set('token', '22509F2AE7BA71E4C3FB32AB94B6CEA8')
  //   })
  // } 
  
  return next(req);
};
