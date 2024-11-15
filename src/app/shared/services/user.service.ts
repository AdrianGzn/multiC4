import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { User } from '../models/user';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://127.0.0.1:8000';  

  private user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
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

  register(registerData: any): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/user/`, registerData).pipe(
      tap((data) => {
        console.log(data);
        this.user = data;
      }),
      catchError(error => {
        console.log(error)
        throw error
      })
    )
  }

  logOut(): void {
    this.user = {
      id_usuario: 0,
      id_rol: 0,
      nombre: '',
      id_establecimiento: 0,
      id_servicio: 0
    };
  }

  getUser(): User {
    return this.user;
  }

  postUsers(): void {
    
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/`, updatedUser).pipe(
      tap((data: User) => {
        console.log(data);
        this.user = data;
      }),
      catchError(error => {
        console.log(error)
        throw error
      })
    )
  }


  onCheckout(quote: any): void {
    this.http.post(`${this.baseUrl}/quote/`, quote).subscribe(
      async(res: any) => {
        let stripe = await loadStripe('pk_test_51QA1JN04GnkleiMSULPFvf7K29JgGAwupkaVMMVYVJFOc4Rvo2HTY8PYWZzGSXkxYIOjpXTXPoT4QQ2I3CIv4nqp00sOEe4GOp');
        stripe?.redirectToCheckout({
          sessionId: res.id_usuario
        })
      }
    )
  }
}
