// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const user = this.authService.getUserData();
    const userRole = user ? user.rol : null;

    if (!userRole) {
        Swal.fire('Acceso denegado', 'No tienes permisos para acceder a esta página.', 'error');
        this.router.navigate(['/login']);
      }
      return false; // Bloquea la ruta
  }
}
