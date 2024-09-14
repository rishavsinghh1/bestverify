import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from '../../../service/message.service';
import { OtpComponent } from '../otp/otp.component';
import { CommonService } from '../../../service/common.service';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,OtpComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('modal', { static: false })modal!: OtpComponent;
  message:any;
  loginform:any =new FormGroup({})


  constructor(private _commonservice:CommonService,private fb:FormBuilder,
    private _apiservice:ApiService,public router: Router,
    private _reponseMessage:MessageService,private _sessionStore:SessionstorageService){
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
      email_phone:this.loginform.controls.email.value,
      password:this.loginform.controls.password.value,
      latitude:'25.5940947',
      longitude:'25.5940947',
      type:1

    }
    // console.log(obj);
    this._apiservice._postData(obj,endpoint.auth.login).subscribe((resp: any) => {
      this._sessionStore.setUserData('loginsession',resp);
      if(resp.statuscode == 200 && resp.responsecode == 2){
         let emitdata ={
          phoneno:resp.data.phone,
          email:obj.email_phone,
          password:obj.password
         }
        this._commonservice.sendData(emitdata);
        //this.mobno= resp.data;
        this.openModal();
        this._reponseMessage._successaAlert(resp.message,'success'); 
   } else if(resp.statuscode == 200 && resp.responsecode == 1){
      this.router.navigate(['/dashboard']);
       console.log('Response',resp) 
      this._reponseMessage._successaAlert(resp.message,'success');
   }else{
    this._reponseMessage._successaAlert(resp.message,'error');
     
   }

    })
  }

  openModal(){
    this.modal.open();
  }
}
