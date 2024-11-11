import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '';
  constructor(readonly httpClient:HttpClient) { }

  getUsers(): Observable<Patient> {
    return this.httpClient.get<Patient>(this.url).pipe(
      catchError((error: Error) => {
        return of({} as Patient)
      })
    );
  }

  login(name: string, password: string): Observable<boolean> {
    return this.httpClient.post<{ estado: boolean }>(this.url, { name, password }).pipe(
      map(response => response.estado),
      catchError((error) => {
        console.error('Error en el login:', error);
        return of(false);
      })
    );
  }
  

}
