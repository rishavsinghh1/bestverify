import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform:any =new FormGroup({})

  constructor(private fb:FormBuilder,private _apiservice:ApiService,public router: Router){
  this.loginform= this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required],
  })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('====================================');
    console.log(environment.apiUrl);
    console.log('====================================');
  }

  login(){
    console.log('hlw');
    let obj={
      email:this.loginform.controls.email.value,
      password:this.loginform.controls.password.value,
    }
    // console.log(obj);
    this._apiservice._postData(obj,endpoint.auth.login).subscribe((resp: any) => { 
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
      this.router.navigate(['/dashboard']);
      //return resp;

    })
  }
}
