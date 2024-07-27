import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { IntroComponent } from './intro/intro.component';
import { VerifyDocumentComponent } from './verify-document/verify-document.component';
import { BussinessDetailsComponent } from './bussiness-details/bussiness-details.component';

const routes: Routes = [
  {
    path:'',
    component:IntroComponent
  },
  {
    path:'intro',
    component:IntroComponent
  },
  {
    path:'bussiness-detail',
    component:BussinessDetailsComponent
  },
  {
    path:'verify-document',
    component:VerifyDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycRoutingModule { }
