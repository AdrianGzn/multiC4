import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { User } from '../models/user';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://127.0.0.1:8000';  

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

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/`, registerData).pipe(
      tap((data) => {
        console.log(data)
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
      horario: [],
      id_establecimiento: 0,
      id_servicio: 0
    };
  }

  getUser(): User {
    return this.user;
  }

  //Lo anterior que no sé si sirva
  

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employee/`);
  }

  createEmployee(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employee/`, employeeData);
  }

  changeEmployee(idEmployee: string, employeeData: any): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employee/${idEmployee}`, employeeData);
  }

  deleteEmployee(idEmployee: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employee/${idEmployee}`);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/patient/`);
  }

  createPatient(patientData: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/patient/`, patientData);
  }

  changePatient(idPatient: string, patientData: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/patient/${idPatient}`, patientData);
  }

  deletePatient(idPatient: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/patient/${idPatient}`);
  }
}
