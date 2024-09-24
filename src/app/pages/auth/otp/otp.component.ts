import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonService } from '../../../service/common.service';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [NgOtpInputModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {

  @ViewChild('myModal', { static: false })
  modal!: ElementRef;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  otp: any;
  data:any;


  countDown:any;
  counter = 60;
  tick = 1000;

  constructor(public router: Router,private _commonservice: CommonService,private _apiservice:ApiService,private _sessionStore:SessionstorageService) { 
    this._commonservice.data$.subscribe(data => {
      this.data = data;
      console.log('data_phone',data)
    });
  }
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  resendOtp(){
    let obj={
      email_phone:this.data.email,
      password:this.data.password,
      latitude:'25.5940947',
      longitude:'25.5940947',
      type:1

    }
    this._apiservice._postData(obj,endpoint.auth.login).subscribe((resp: any) => {
      console.log('resendOtpDta',resp)
      if(resp.statuscode == 200 && resp.responsecode == 2){
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
          icon: "success",
          title: "Otp send successfully"
        });
      }
    });
  }
  onOtpChange(otp:any) {
    this.otp = otp;
    if(this.otp.length == 4){
      let obj={
        email_phone:this.data.email,
        otp:this.otp,
        latitude:'25.5940947',
        longitude:'25.5940947',
     
  
      }
      console.log(this.otp);
      this._apiservice._postData(obj,endpoint.auth.otp).subscribe((resp: any) => { 
        //resendOtp Code
        // this.countDown = timer(0, this.tick)
        // .pipe(take(this.counter))
        // .subscribe(() => {
        //   --this.counter;
        //   // console.log(this.counter);
        //   if (this.counter == 0) {
        //     this.countDown.unsubscribe();
        //   }
        // });
 
      //end ressendOtp code

      this._sessionStore.setUserData('loginsession',resp);
      if(resp.statuscode == 200 && resp.responsecode == 1){
        this.router.navigate(['/dashboard']);
        console.log('Response',resp) 
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
         icon: "success",
         title: "Signed in successfully"
       });
      }
      })



    }
    
  }
  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

 
  ngOnInit() {
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        // console.log(this.counter);
        if (this.counter == 0) {
          this.countDown.unsubscribe();
        }
      });
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
  

