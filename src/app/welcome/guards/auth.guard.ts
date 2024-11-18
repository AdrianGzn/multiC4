import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); 
  const router = inject(Router); 

  const user = userService.getUser(); 

  if (!user || user.id_usuario === 0) {
    
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles = route.data?.['roles'] as Array<string>;
  if (expectedRoles && !expectedRoles.includes(getRoleName(user.id_rol))) {

    router.navigate(['/login']);
    return false;
  }

  return true; 
};

function getRoleName(roleId: number): string {
  switch (roleId) {
    case 1:
      return 'patient';
    case 2:
      return 'receptionist';
    case 3:
      return 'doctor';
    default:
      return 'unknown';
  }
}
