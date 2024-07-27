import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform:any =new FormGroup({})

  constructor(private fb:FormBuilder,private _apiservice:ApiService){
  this.loginform= this.fb.group({
    name:['',Validators.required],
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
      name:this.loginform.controls.name.value,
      password:this.loginform.controls.password.value,
    }
    // console.log(obj);
    this._apiservice._postData(obj,endpoint.auth).subscribe((resp: any) => { 
      console.log('Response',resp)
    })
  }
}
