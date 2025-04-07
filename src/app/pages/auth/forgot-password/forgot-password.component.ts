import { Component, inject } from '@angular/core';
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
  forgotpassword:any=new FormGroup({})


  constructor(private _fb:FormBuilder,private apiService:ApiService,private _sessionStore:SessionstorageService){
      this.forgotpassword=this._fb.group({
        email:[''],
        pan:[''],
      })
  }
  clickforgotPwd(){
  const fogotData={
      email:this.forgotpassword.controls.email.value,
      pan:this.forgotpassword.controls.pan.value,

    }
      this.apiService._postData(fogotData,endpoint.auth.forgotpassword).subscribe((resp: any) => { 
      console.log('fogresp',resp)
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
