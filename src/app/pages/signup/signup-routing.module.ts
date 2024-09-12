import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step-1/step-1.component';
import { SignupComponent } from './signup.component';
import { Step2Component } from './step-2/step-2.component';
import { SelctCompanyTypeComponent } from './selct-company-type/selct-company-type.component';

const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'step1',
    component:Step1Component
  },
  {
    path:'step2',
    component:SelctCompanyTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
