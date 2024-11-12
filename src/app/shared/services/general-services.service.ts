import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';
import { Role } from '../models/role';
import { ScheduleDoctor } from '../models/schedule-doctor';

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

  getEstablishment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/establishment/`);
  }

  getEstablishmentByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishment/${name}`);
  }
  
  getEstablishmentByService (servicio: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishmentService/${servicio}`);
  }

  createEstablishment(establishmentData: any): Observable<any> {
    return this.http.post<Role>(`${this.baseUrl}/establishment/`, establishmentData);
  }

  changeEstablishment(idEstablishment: number, establishmentData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${idEstablishment}`, establishmentData);
  }

  deleteEstablishment(idRol: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/establishment/${idRol}`);
  }
}