import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step-1/step-1.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'step1',
    component:Step1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
