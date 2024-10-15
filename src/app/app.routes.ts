import { Routes } from '@angular/router';
import { authGuard } from './utility/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path:'signup',
    loadChildren:() => import('./pages/signup/signup.module').then((m)=>m.SignupModule)
  },
  {
    path:'kyc',
    loadChildren:() => import('./pages/kyc/kyc.module').then((m)=>m.KycModule)
  }, 
  {
   path:'dashboard',
   canActivate: [authGuard],
   loadChildren:() => import('./pages/dashboard/dashboard.module').then((m)=>m.DashboardModule)
  },

];
