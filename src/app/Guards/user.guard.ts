import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)

  if (localStorage.getItem('userToken') == null && localStorage.getItem('userRole') == 'SystemUser') {
    return true;
  } else {
    _Router.navigate(['/auth/login'])
    return false;
  }

};
