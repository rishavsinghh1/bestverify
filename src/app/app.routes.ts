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
    path: 'home',
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent:() => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path:'kyc',
        loadChildren:() => import('./pages/kyc/kyc.module').then((m)=>m.KycModule)
      }, 
      {
        path:'fund',
        loadChildren:() => import('./pages/fund/fund.module').then((m)=>m.FundModule)
      },
    ]
  }

];
