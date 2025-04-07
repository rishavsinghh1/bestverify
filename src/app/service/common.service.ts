import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  openSnackBar(message: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private dataSubject = new BehaviorSubject<any>(null);
  private isLogin  = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();

  constructor() { }

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  set setLoginStatus(status: boolean) {
    this.isLogin.next(status);
  }
  get getLoginStatus() {
    return this.isLogin.asObservable();
  }
}
