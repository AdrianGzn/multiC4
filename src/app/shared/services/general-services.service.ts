import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { Campaign } from '../models/campaign';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';
import { Quote } from '../models/quote';
import { Role } from '../models/role';
import { ScheduleDoctor } from '../models/schedule-doctor';
import { Schedule } from '../models/schedule';

import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServices {

  private baseUrl: string = 'http://3.227.141.174:8000';  

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/rol/`);
  }

  createRole(roleData: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/rol/`, roleData);
  }

  changeRole(idRol: string, userData: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/users/${idRol}`, userData);
  }

  deleteRole(idRol: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/rol/${idRol}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employee/`);
  }

  createEmployee(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employee/`, employeeData);
  }

  changeEmployee(idEmployee: string, employeeData: Employee): Observable<Employee> {
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

  getDoctorSchedules(): Observable<ScheduleDoctor[]> {
    return this.http.get<ScheduleDoctor[]>(`${this.baseUrl}/scheduleDoctor/`);
  }

  createDoctorSchedule(scheduleData: ScheduleDoctor): Observable<ScheduleDoctor> {
    return this.http.post<ScheduleDoctor>(`${this.baseUrl}/scheduleDoctor/`, scheduleData);
  }

  changeDoctorSchedule(idSchedule: string, scheduleData: ScheduleDoctor): Observable<ScheduleDoctor> {
    return this.http.put<ScheduleDoctor>(`${this.baseUrl}/scheduleDoctor/${idSchedule}`, scheduleData);
  }

  deleteDoctorSchedule(idSchedule: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/scheduleDoctor/${idSchedule}`);
  }

  loginEmployee(loginData: any): Observable<any> {
    console.log('Si llega al servicio');
    return this.http.post(`${this.baseUrl}/login`, loginData).pipe(
      catchError(error => {
        console.error('Error al obtener todos los usuarios: ', error);
        throw error;
      })
    )
  }

  getEstablishmentByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishment/${name}`);
  }
  
  getEstablishmentByService (servicio: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishmentService/${servicio}`);
  }
}
