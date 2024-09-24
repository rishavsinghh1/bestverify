import { UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';


// function to allowed maximum number
export function maxNumToBeAllowed(event:any, maxLen:any) {
  if (event.target.value.length >= maxLen) {
    return false;
  }
  return true;
};
export function validateNumber(event:any) {
  const keyCode = event.keyCode;

  const excludedKeys = [8, 37, 39, 46];

  if (!((keyCode >= 48 && keyCode <= 57) ||
    (keyCode >= 96 && keyCode <= 105) ||
    (excludedKeys.includes(keyCode)))) {
    event.preventDefault();
  }
}
// function to check account and confirm account number
export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: UntypedFormGroup) => {
    let control = formGroup.controls[controlName];
    // console.log(control)
    const matchingControl = formGroup.controls[matchingControlName];
    // console.log(matchingControl)
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    };
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
};




// function to generate random numbers
export function getRandomInt(min:any, max:any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genString(length:any) {
  var times = length;
  var key = '';
  while (times > 0) {
    times--;
    key += getRandomInt(0, 9);
  }
  return key;
}

export function chekValueIsNumberOrNot(val:any) {
  return /^-?\d+$/.test(val);
}
export function validateEmail(email:any) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
  return re.test(email);
}
