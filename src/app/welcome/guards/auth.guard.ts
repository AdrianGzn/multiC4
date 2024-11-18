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

  const userLocoal = JSON.parse(localStorage.getItem("userData") || '{}')
  console.log(userLocoal)

  if(userLocoal && userLocoal.rol) {
    switch(userLocoal) {
      case 'patient': 
        router.navigate(["./welcome/patient"])
        console.log("paciente")
        return true; 
      
    }
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
