import { Component } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import Swal from 'sweetalert2';
import { endpoint } from '../../../service/endpoint';
import { ApiService } from '../../../service/api.service';
import { ShowErrorsComponent } from '../../../utility/show-errors/show-errors.component';
import { regExpNativePatternValidator } from '../../../utility/validator';
import { NgFor, NgIf } from '@angular/common';
import { InputRestrictionDirective } from '../../../utility/InputRestriction/input-restriction.directive';
import { DynamicOtpComponent } from '../../../utility/component/dynamic-otp/dynamic-otp.component';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-selct-company-type',
  standalone: true,
  imports: [AutocompleteLibModule,ShowErrorsComponent,ReactiveFormsModule,NgFor,NgIf,InputRestrictionDirective,DynamicOtpComponent],
  templateUrl: './selct-company-type.component.html',
  styleUrl: './selct-company-type.component.scss'
})
export class SelctCompanyTypeComponent {
  companyTypeForm:any= UntypedFormGroup;
  companyListData: any[] = [];
  isOtpBoxShow = false;
  latitude: any;
  longitude: any;
  keyword = 'name';
  btnName = 'Submit';
  enteredOTP: any = '';
  userData: any;
  otpTimer = false;
constructor(private sharedService:SharedService,private _apiservice:ApiService,private fb:FormBuilder,private session:SessionstorageService){

  this.longitude = 29.00;
        this.latitude = 29.00;
}

ngOnInit(): void {
  this.formInit()
  let obj ={
    type:1,
  latitude:25.5940947,
  longitude:25.5940947
  }
  this._apiservice._postData(obj,endpoint.auth.companylist).subscribe((resp: any) => {
    console.log(resp);

    this.companyListData =resp.company_list;

  });
  //console.log('userData')
  let session: any = this.session.getUserData('addUserDetails');
  //console.log(session);
  if (session) {
    this.userData = session;
    //console.log(this.userData);
  };
}

formInit() {
  this.companyTypeForm = this.fb.group({
    comapnyList: ['', [Validators.required]],
    username: ['', [Validators.required, regExpNativePatternValidator(
      'mobile',
      {
        termconditionError: () => `Enter valid Mobile Number.`,
      }
    )]]
  })
};

get companyFormControls() {
  return this.companyTypeForm.controls;
}

onNextButtonClick() {
  //console.log( this.companyTypeForm?.get('comapnyList')?.value);

  if (this.companyTypeForm?.get('comapnyList')?.value) {
    let formData = new FormData();
    formData.append('username', this.companyTypeForm?.get('username')?.value);
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.latitude);
    this._apiservice._postData(formData,endpoint.auth.register).subscribe({
      next: (res: any) => {
        if (res) {
          if (res.statuscode == 200 && res.status == true) {
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
              title: res.message
            });
            this.validateOTP()
          } else {
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
              title: res.message
            });
          }
        }
        else {
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
            title: res.message
          });
        }
      }, error: (err: any) => {
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
          title: err.message
        });
        //this.toaster.showError(err.message, "Error");
      }
    }
    )
  }
};

validateOTP(resend?: any) {
  let formData = new FormData();
  formData.append('phone', this.companyTypeForm?.get('username')?.value);
  formData.append('latitude', this.latitude);
  formData.append('longitude', this.latitude);

  this._apiservice._postData(formData,endpoint.auth.registerotp).subscribe({
    next: (res: any) => {
      if (res) {
        if (res.statuscode == 200) {
          // this.toaster.showSuccess(res.message, "Success");
          this.isOtpBoxShow = true;
          if (resend && resend === 'resend') {
            //console.log("inside if ");

           this.otpTimer = true;
          }
          // this.otpTimer = false;

        } else {
          //this.toaster.showError(res.msg, "Error")
        }
      }
      else {
        //this.toaster.showError(res.msg, "Error")
      }
    }, error: (err: any) => {
      //this.toaster.showError(err.msg, "Error");
    }
  }
  )
};
onOtpSubmit(event:any) {
  this.enteredOTP = event;
  //console.log(this.enteredOTP)
  if (this.enteredOTP) {
    this.sendOTP()
  }
};
sendOTP() {
  let formData = new FormData();
  formData.append('phone', this.companyTypeForm?.get('username')?.value);
  formData.append('company_id', this.companyTypeForm?.get('comapnyList')?.value);
  formData.append('password', this.userData.password);
  formData.append('latitude', this.latitude);
  formData.append('longitude', this.longitude);
  formData.append('confirm_password', this.userData.confirmPassword);
  formData.append('email', this.userData.email);
  formData.append('otp', this.enteredOTP);
  formData.append('fname', this.userData.firstName);
  formData.append('lname', this.userData.lastName);
  this._apiservice._postData(formData,endpoint.auth.finalregister).subscribe({
    next: (res: any) => {
      // if (res) {
      //   if (res.statuscode == 200) {
      //     this.toaster.showSuccess(res.message, "Success");
      //     this.sessionStorage.setItem('userDetails', res);
      //     this.sessionStorage.setItemLocalStorage("userDetails", res);
      //     this.router.navigate(['/dashboard']);
      //     setTimeout(() => {
      //       this.dashboardService.dashboardCall.emit(true);
      //     }, 1);
      //   } else {
      //     this.toaster.showError(res.message, "Error")
      //   }
      // }
      // else {
      //   this.toaster.showError(res.message, "Error")
      // }
    }, error: (err: any) => {
     // this.toaster.showError(err.message, "Error");
    }
  }
  )
}


}

