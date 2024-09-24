import { Component } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../service/shared.service';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import { regExpNativePatternValidator } from '../../../utility/validator';
import { PasswordReg } from '../../../utility/password-reg';
import { ConfirmedValidator } from '../../../utility/common-function';
import { NgClass, NgIf } from '@angular/common';
import { ShowHidePasswordDirective } from '../../../utility/directive/show-hide-password.directive';
import { ShowErrorsComponent } from '../../../utility/show-errors/show-errors.component';
import { ApiService } from '../../../service/api.service';
import { endpoint } from '../../../service/endpoint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass,ShowHidePasswordDirective,ShowErrorsComponent],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component {
  registerData: any[] = [];
  addUserForms: any=UntypedFormGroup;
  submitted: boolean = false;
  showErrorBox = false;
constructor (
  private sharedService: SharedService,
  private _sessionstore:SessionstorageService,
  private fb:FormBuilder,
  private _apiservice:ApiService,
  private router : Router
){

}
ngOnInit(): void {
  this.formInit()

}

formInit() {
  this.addUserForms = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    password: [
      '',
      [
        Validators.required,
        PasswordReg.patternValidator(/\d/, {
          hasNumber: true,
        }),
        // check whether the entered password has upper case letter
        PasswordReg.patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        // check whether the entered password has a lower case letter
        PasswordReg.patternValidator(/[a-z]/, {
          hasSmallCase: true,
        }),
        // check whether the entered password has a special character
        PasswordReg.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true,
          }
        ),
        Validators.minLength(8),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    username: ['', [Validators.required, regExpNativePatternValidator(
      'email',
      {
        termconditionError: () => `Enter valid Email id.`,
      }
    )]]
  },
    {
      validator: ConfirmedValidator('password', 'confirmPassword')  // adding custom validation to compare account and confirm account number
    });
};
getStart() {
  console.log('hjdghjfghjdg');

  // this.openOTPModal();
  this.createUser();
}
async createUser() {
  let data = new FormData();
  data.append('username', this.addUserForms?.get('username')?.value);
  data.append('password', this.addUserForms?.get('password')?.value);
  data.append('confirm_password', this.addUserForms?.get('confirmPassword')?.value);
  data.append('latitude', "28.30");
  data.append('longitude', "28.30");
  await this._apiservice._postData(data,endpoint.auth.register).subscribe({
    next: (res: any) => {
      console.log(res);
      if (res) {
        if (res.statuscode == 200 && res.status == true) {
          // this.toaster.showSuccess(res.message, "Success");

          this._sessionstore.setUserData('addUserDetails', {
            firstName: this.addUserForms.value.firstName,
            lastName: this.addUserForms.value.lastName,
            password: this.addUserForms.value.password,
            confirmPassword: this.addUserForms.value.confirmPassword,
            email: this.addUserForms.value.username,
          });
          if (res.responsecode == 1) {
            this.router.navigate(['/signup/step2'])
          }

        } else {
         // this.toaster.showError(res.message, "Error")
        }
      }else {
        //this.toaster.showError(res.message, "Error")
      }
    }, error: (err: any) => {
      console.log(err);

      //this.toaster.showError(err.message, "Error");
    }
  }
  )
};
    submitStep1(){
      let data = {
        "fname":"rishav",
        "lanme":"singh"
      }
      this._sessionstore.setUserData('step1signup',data);
    }
    get loginControls() {
      return this.addUserForms.controls;
    }

}
