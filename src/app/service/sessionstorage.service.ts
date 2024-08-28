import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

  setData(name:any,data:any){
    if(data){
      sessionStorage.setItem(name,JSON.stringify(data)); 
    }
  }

  removeData(name:any){
    sessionStorage.removeItem(name);
  }
  getData(name:any){
     sessionStorage.getItem(name);
  }
}
