import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { endpoint } from '../../../service/endpoint';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  regFrm:any=new FormGroup({})
  constructor(private fb:FormBuilder,private _apiservice:ApiService,public router: Router){
     this.regFrm=this.fb.group({
      name:['',Validators.required],
      username:['',Validators.required],
      firmname:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      address:['',Validators.required],
     })
  }
  register(){
    let obj={
      name:this.regFrm.controls.name.value,
      username:this.regFrm.controls.username.value,
      firmname:this.regFrm.controls.firmname.value,
      phone:this.regFrm.controls.phone.value,
      email:this.regFrm.controls.email.value,
      password:this.regFrm.controls.password.value,
      address:this.regFrm.controls.address.value,
    }

    this._apiservice._postData(obj,endpoint.auth.register).subscribe((resp: any) => { 
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
        title: "Register successfully"
      });
      // this.router.navigate(['/dashboard']);
      //return resp;

    })
  }
}
