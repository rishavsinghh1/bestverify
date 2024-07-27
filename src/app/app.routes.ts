import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path:'kyc',
    loadChildren:() => import('./pages/kyc/kyc.module').then((m)=>m.KycModule)
  },
  {
    path:'user-management',
    loadChildren:() => import('./pages/user-management/user-management.module').then((m)=>m.UserManagementModule)
  },
  {
   path:'dashboard',
   loadChildren:() => import('./pages/dashboard/dashboard.module').then((m)=>m.DashboardModule)
  },

];
