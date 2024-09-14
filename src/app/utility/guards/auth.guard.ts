import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ApiService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect the user to the login page
    router.navigate(['/login']);
    return false;
  }
};
