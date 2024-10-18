import { Component, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule, RouterModule, OtpComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('modal', { static: false }) modal!: OtpComponent;
  message: any;
  loginform: any = FormGroup;
  userData: any;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private responseMessage: MessageService,
    private _SessionstorageService: SessionstorageService
  ) {}

  ngOnInit(): void {
    console.log(`Environment API URL: ${environment.apiUrl}`);
    // this.userData = this._SessionstorageService.getUserData('loginsession');
    // if (this.userData) {
    //   this.router.navigate(['/dashboard']);
    // }

    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const loginData = {
      email_phone: this.loginform.controls.email.value,
      password: this.loginform.controls.password.value,
      latitude: '25.5940947',
      longitude: '25.5940947',
      type: 1
    };

    this.apiService._postData(loginData, endpoint.auth.login).subscribe((response: any) => { 
      if (response.statuscode === 200 && response.responsecode === 2) { 
        const emitData = {
          phoneno: response.data.phone,
          email: loginData.email_phone,
          password: loginData.password
        };
        this.commonService.sendData(emitData);
        this.openModal();
        this.responseMessage._successaAlert(response.message, 'success');
      } else if (response.statuscode === 200 && response.responsecode === 1) {
        this._SessionstorageService.setUserData('loginsession', response); 
        this.commonService.sendData(response);
          this.router.navigate(['/dashboard']); 
        console.log('Response', response);
        this.responseMessage._successaAlert(response.message, 'success');
      } else {
        this.responseMessage._successaAlert(response.message, 'error');
      }
    });
  }

  openModal(): void {
    this.modal.open();
  }
}