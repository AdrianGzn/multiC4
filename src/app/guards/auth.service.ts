// src/app/shared/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Obtener los datos del usuario desde el localStorage
  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const user = this.getUserData();
    return user != null;
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    const user = this.getUserData();
    return user ? user.rol : null;
  }
}
