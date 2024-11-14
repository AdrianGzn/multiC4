import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://3.227.141.174:8000';  

  private user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    horario: [],
    id_establecimiento: 0,
    id_servicio: 0
  };

  constructor(private http: HttpClient) {}

  loginEmployee(loginData: any): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/login`, loginData).pipe(
      tap((data) => {
        this.user = data;
      }),
      catchError(error => {
        console.error(`Error :` + error);
        throw error;
      })
    )
  }

  logOut(): void {
    this.user = {
      id_usuario: 0,
      id_rol: 0,
      nombre: '',
      horario: [],
      id_establecimiento: 0,
      id_servicio: 0
    };
  }

  getUser(): User {
    return this.user;
  }

  postUsers(): void {
    
  }
}
