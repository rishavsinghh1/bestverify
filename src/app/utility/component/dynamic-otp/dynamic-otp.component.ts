import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonService } from '../../../service/common.service';
import { ApiService } from '../../../service/api.service';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import { MaxLengthValidator, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, timer, take } from 'rxjs';
import { InputRestrictionDirective } from '../../InputRestriction/input-restriction.directive';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dynamic-otp',
  standalone: true,
  imports: [NgOtpInputModule,InputRestrictionDirective,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './dynamic-otp.component.html',
  styleUrl: './dynamic-otp.component.scss'
})
export class DynamicOtpComponent {
  @ViewChild('myModal', { static: false })
  modal!: ElementRef;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  otp: any;
  data:any;
  @Input() btnName?:string;
  @Input() maxLength?:number;
  @Input() timer:any;
  @Output() submit: EventEmitter<number> = new EventEmitter();
  @Output() resendOTP: EventEmitter<any> = new EventEmitter();
  @Output() resendOtpReset: EventEmitter<any> = new EventEmitter();
  @Input() resendOTPCounter: number = 30; //set resend timmer
  @Input() dynamicResendCounter: boolean = true; //show resend button

  submitted:boolean=false;
  countDown: any =Subscription;
  counter = 120;
  tick = 1000;
  formData:any =UntypedFormGroup;
  count: any;
  constructor(public router: Router, private fb:UntypedFormBuilder,private _commonservice: CommonService,private _apiservice:ApiService,private _sessionStore:SessionstorageService) {
    this.formData=this.fb.group({
      otp:['',[Validators.required]]
    })
  }
  get f(){
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.onResendOTP(false);
    // this.transformData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['timer'])
    if(changes['timer'].currentValue){
      this.transformData();
      // setTimeout(() => {
      //   this.resendOtpReset.emit(true);
      // }, 1);

    }
  }
  onResendOTP(reset: boolean){
    let count: number = this.resendOTPCounter;
    let inter = setInterval(() => {
      count -= 1;
      this.count = count;
      if (count == 0) {
        clearInterval(inter);
        this.count = null;
        if (this.dynamicResendCounter) {
          this.resendOTPCounter += 30;
        }
      }
    }, 1000);
    if (reset) {
      this.resendOTP.emit(true);
    }

}

onSubmitOTP() {
  this.submitted=true;
  if(this.formData.invalid){
    return;
  }
  this.submit.emit(this.formData.value.otp);
}

close() {
  this.modal.nativeElement.style.display = 'none';
}

transformData(){
  // console.log("inside transform data")
  this.countDown = timer(0, this.tick)
  .pipe(take(this.counter))
  .subscribe(() => {
    --this.counter;
    // console.log(this.counter);
    if (this.counter == 0) {
      this.countDown.unsubscribe();
    }
  });
  this.transform(120);
}
transform(value: number): string {
  const minutes: number = Math.floor(value / 60);
  return (
    ('00' + minutes).slice(-2) +
    ':' +
    ('00' + Math.floor(value - minutes * 60)).slice(-2)
  );
}
}
