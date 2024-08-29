import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonService } from '../../../service/common.service';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  
}
