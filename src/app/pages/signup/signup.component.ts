import { Component } from '@angular/core';
import { Step1Component } from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { SelctCompanyTypeComponent } from './selct-company-type/selct-company-type.component';
import { CommonService } from '../../service/common.service';
import { NgIf } from '@angular/common';
import { SharedService } from '../../service/shared.service';
import { SessionstorageService } from '../../service/sessionstorage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [Step1Component,Step2Component,SelctCompanyTypeComponent,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  enableCompanyList:boolean=true;
  data: any = [];
constructor(private sharedService: SharedService,private _sessionstore:SessionstorageService){

}

ngOnInit(){
  let arrdata =[];

 let data = this._sessionstore.getUserData('step1signup');

 if(data){
  this.enableCompanyList = true;
 }else{
  this.enableCompanyList = false;
 }
  // this.sharedService.getData('step1signup').subscribe((res:any)=>{
  //   arrdata.push(res);
  //   console.log(res);
  //   this.data = res;
  //  if(res){

  //     this.enableCompanyList = true;
  //     this.sharedService.getData('compnyId').subscribe((res:any)=>{
  //       console.log(`companyId:`,res);
  //       arrdata.push(res);

  //     })
  //     console.log(arrdata);

  //  }else{
  //   this.enableCompanyList = false;
  //  }
}
}
