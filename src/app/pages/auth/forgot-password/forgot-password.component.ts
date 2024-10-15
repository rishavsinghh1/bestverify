import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import Swal from 'sweetalert2';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotpwd:any=new FormGroup({})


  constructor(private _fb:FormBuilder,private _apiservice:ApiService,private _sessionStore:SessionstorageService){
      this.forgotpwd=this._fb.group({
        email:[''],
        pan:[''],
      })
  }
  forgotPwd(){
  let obj={
      email:this.forgotpwd.controls.email.value,
      pan:this.forgotpwd.controls.pan.value,

    }
    this._apiservice._postData(obj,endpoint.auth.forgotpassword).subscribe((resp: any) => {
      if(resp.statuscode == 200 && resp.responsecode == 1){
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
          title: resp.message
        });
       }else{
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
          title: resp.message
        });
       }
    })
  
}
}
