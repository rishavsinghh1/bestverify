import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { regExpPattern } from '../validators/regExpPatternList';



export function dateValidation(mindate?: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    //console.log('control >>', control);

    const today = new Date();
    const dateInserted = new Date(control.value);
    const getYear: any = dateInserted.getFullYear();
    const ValidateYear = /^(19|20)\d{2}$/;
    if (!ValidateYear.test(getYear)) {
      return { validDate: () => `Enter Valid Year.` };
    }
    if (dateInserted.getTime() > today.getTime()) {
      return { validDate: () => `Future date not excepted` };
    }
    if (mindate) {
      today.setDate(today.getDate() - mindate);
      if (dateInserted.getTime() < new Date(today.toISOString().split('T')[0]).getTime()) {
        return { validDate: () => `Min date is not valid` };
      }
    }
    return null;
  };
}

export function comparePassword(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control: any = formGroup.controls[controlName];
    const matchingControl: any = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

export function RemoveSpecialCharacters(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { specialcharacters: true };
    } else {
      return null;
    }
  };
}

export function serviceProvider(): ValidatorFn {
  return (control: AbstractControl): { invalid: boolean } | null => {
    const providerId = control.value;
    if (providerId && providerId == '001') {
      return { invalid: true };
    } else {
      return null;
    }
  };
}

export function regExpPatternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  //HOW TO USE
  //[Validators.required, PasswordReg.patternValidator( /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/, { wrongPattern: true } )]
  //GSTIN /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/
  //PAN   /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  //Udyogno   /[A-Za-z]{2}\d{2}[A-Za-z]{1}\d{7}/

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

export function regExpNativePatternValidator(
  logic: string | RegExp | Function,
  error: ValidationErrors,
  reverseValidation: boolean = false
): ValidatorFn {
  //HOW TO USE
  //[Validators.required, PasswordReg.patternValidator( /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/, { wrongPattern: true } )]
  //GSTIN: "/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/"
  //PAN: "/[A-Z]{5}[0-9]{4}[A-Z]{1}$/"
  //Udyogno: "/[A-Za-z]{2}\d{2}[A-Za-z]{1}\d{7}/"

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value === null || control.value === undefined) {  //if (!control.value)
      // if control is empty return no error
      return null;
    }

    let valid!: boolean;
    // console.log(typeof logic, logic);

    if (typeof logic === 'function') {
      logic({
        value: control.value,
        callBack: (val: any, cbError?: ValidationErrors) => {
          valid = val;
          error = cbError ? cbError : error;
        },
      });
    } else if (typeof logic === 'string' || typeof logic === 'object') {
      valid = new RegExp(
        typeof logic === 'string' ? regExpPattern[logic.trim()] : logic
      ).test(control.value);
    }
    // console.log(regExpPattern[logic]);

    // test the value of the control against the regexp supplied

    // const valid = logic.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    if (reverseValidation) {
      valid = !valid;
    }
    // console.log(valid);

    return valid ? null : error;
  };
}

// Uses of regExpNativePatternValidator

//1   use as function
// regExpNativePatternValidator(
//   (obj: any) => {
//     let val = obj.value;
//     let res: boolean;
//     val = typeof val !== 'number' ? +val : val;
//     if (val <= 100 && val > 90) {
//       // res = true;
//       obj.callBack(false, {
//         maxAmount10K: () => `cannot enter amount between 90 to 100`,
//       });
//     }else{
//       obj.callBack(true);
//     }
//   },
//   {
//     maxAmount10K: () => `Enter amount 1Rs to 10 Lakh.`,
//   }
// ),

// 2    RegExp of amount should between rs 1 to 10 lack
// regExpNativePatternValidator(
//   /\b([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|1000000)\b/,
//   {
//     maxAmount10K: () => `Enter amount ₹1 to ₹10 Lakh`,
//   }
// ),
export class Validatorss {
  constructor() {}
  static validDate(): ValidatorFn {
    return (control: AbstractControl): { invalidDate: any } | null => {
      const val = control.value;

      return { invalidDate: () => `Dasddsdte is invalid.....!` };
      if (val && val == '001') {
      } else {
        return null;
      }
    };
  }
}
// export function validDate(): ValidatorFn {

//   return (control: AbstractControl): { invalidDate: any } | null => {

//     const val = control.value;

//     if (val && val == '001') {
//       return { invalidDate: () => `Date is invalid.....!` };
//     } else {
//       return null;
//     }
//   };
// }
// export function AmountMax(max: Number): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {

//     };

// }
