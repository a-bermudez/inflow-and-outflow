import { inject } from '@angular/core';
import { CanActivateFn, Router, CanMatchFn } from '@angular/router';
import { AuthService } from './auth-service.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const authGuardMatch: CanMatchFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};