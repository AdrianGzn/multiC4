import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { AddressResponse } from '../models/address-response';
import { Bill } from '../models/bill';
import { BillResponse } from '../models/bill-response';
import { Campaign } from '../models/campaign';
import { CampaignResponse } from '../models/campaign-response';
import { Establishment } from '../models/establishment';
import { EstablishmentResponse } from '../models/establishment-response';
import { EstablishmentShortResponse } from '../models/establishment-short-response';
import { Quote } from '../models/quote';
import { QuoteResponse } from '../models/quote-response';
import { ScheduleDoctor } from '../models/schedule-doctor';
import { ScheduleDoctorResponse } from '../models/schedule-doctor-response';
import { Schedule } from '../models/schedule';
import { ScheduleResponse } from '../models/schedule-response';
import { Service } from '../models/service';
import { ServiceResponse } from '../models/service-response';
import { TypeEstablishment } from '../models/type-establishment';
import { TypeEstablishmentResponse } from '../models/type-establishment-response';

@Injectable({
  providedIn: 'root'
})
export class GeneralServices {

  private baseUrl: string = 'http://localhost:8000';  

  constructor(private http: HttpClient) {}

  getAddress(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/address/`);
  }

  createAddress(adressData: AddressResponse): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/address/`, adressData);
  }

  changeAddress(idAddress: number, adressData: AddressResponse): Observable<AddressResponse> {
    return this.http.put<AddressResponse>(`${this.baseUrl}/address/${idAddress}`, adressData);
  }

  deleteAddress(idAddress: number): Observable<AddressResponse> {
    return this.http.delete<AddressResponse>(`${this.baseUrl}/addressDelete/${idAddress}`);
  }

  getBill(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/bills/`);
  }

  createBill(billData: BillResponse): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/bills/`, billData);
  }

  changeBill(idBill: number, billData: BillResponse): Observable<BillResponse> {
    return this.http.put<BillResponse>(`${this.baseUrl}/bills/${idBill}`, billData);
  }

  deleteBill(idAddress: number): Observable<AddressResponse> {
    return this.http.delete<AddressResponse>(`${this.baseUrl}/billDelete/${idAddress}`);
  }

  getEstablishment(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`${this.baseUrl}/establishment/`);
  }

  getEstablishmentByName(name: string): Observable<Establishment> {
    return this.http.get<Establishment>(`${this.baseUrl}/searchEstablishment/${name}`);
  }

  getEstablishmentByService(service: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByService/${service}`);
  }

  getEstablishmentByTypeCategory(type: string, category: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByTypeCategory/${type}/${category}`);
  }

  createEstablishment(establishmentData: EstablishmentResponse): Observable<Establishment> {
    return this.http.post<Establishment>(`${this.baseUrl}/establishment/`, establishmentData);
  }

  changeEstablishment(idEstablishment: number, estabishmentData: EstablishmentResponse): Observable<EstablishmentResponse> {
    return this.http.put<EstablishmentResponse>(`${this.baseUrl}/establishment/${idEstablishment}`, estabishmentData);
  }

  deleteEstablishment(idEstablishment: number): Observable<EstablishmentResponse> {
    return this.http.delete<EstablishmentResponse>(`${this.baseUrl}/establishment/${idEstablishment}`);
  }

  createQuote(quotaData: QuoteResponse): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/quotes/`, quotaData);
  }

  getQuote(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/quotes/`);
  }

  changeQuote(idQuote: number, quotesData: QuoteResponse): Observable<AddressResponse> {
    return this.http.put<AddressResponse>(`${this.baseUrl}/quotes/${idQuote}`, quotesData);
  }

  deleteQuote(idQuote: number): Observable<QuoteResponse> {
    return this.http.delete<QuoteResponse>(`${this.baseUrl}/quotes/${idQuote}`);
  }

  createSchedule(scheduleData: QuoteResponse): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.baseUrl}/schedule/`, scheduleData);
  }

  getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedule/`);
  }

  changeSchedule(idSchedule: number, scheduleData: Schedule): Observable<ScheduleResponse> {
    return this.http.put<ScheduleResponse>(`${this.baseUrl}/schedule/${idSchedule}`, scheduleData);
  }

  deleteSchedule(idSchedule: number): Observable<ScheduleResponse> {
    return this.http.delete<ScheduleResponse>(`${this.baseUrl}/schedule/${idSchedule}`);
  }

  createScheduleDoctor(scheduleData: ScheduleDoctorResponse): Observable<ScheduleDoctor> {
    return this.http.post<ScheduleDoctor>(`${this.baseUrl}/scheduleDoctor/`, scheduleData);
  }

  getScheduleDoctor(): Observable<ScheduleDoctor[]> {
    return this.http.get<ScheduleDoctor[]>(`${this.baseUrl}/scheduleDoctor/`);
  }

  changeScheduleDoctor(idSchedule: number, scheduleData: ScheduleDoctorResponse): Observable<ScheduleDoctorResponse> {
    return this.http.put<ScheduleDoctorResponse>(`${this.baseUrl}/scheduleDoctor/${idSchedule}`, scheduleData);
  }

  deleteScheduleDoctor(idSchedule: number): Observable<ScheduleDoctorResponse> {
    return this.http.delete<ScheduleDoctorResponse>(`${this.baseUrl}/scheduleDoctor/${idSchedule}`);
  }

  createService(serviceData: ServiceResponse): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/service/`, serviceData);
  }

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/service/`);
  }

  changeService(idService: number, serviceData: ServiceResponse): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.baseUrl}/services/${idService}`, serviceData);
  }

  deleteService(idService: number): Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${this.baseUrl}/service/${idService}`);
  }

  createTypeEstablishment(typeEstablishmentData: TypeEstablishmentResponse): Observable<TypeEstablishment> {
    return this.http.post<TypeEstablishment>(`${this.baseUrl}/type_establishment/`, typeEstablishmentData);
  }

  getTypeEstablishment(): Observable<TypeEstablishment[]> {
    return this.http.get<TypeEstablishment[]>(`${this.baseUrl}/type_establishment/`);
  }

  changeTypeEstablishment(idTypeEstablishment: number, typeEstablishmentData: ServiceResponse): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.baseUrl}/type_establishment/${idTypeEstablishment}`, typeEstablishmentData);
  }

  deleteTypeEstablishment(idTypeEstablishment: number): Observable<TypeEstablishmentResponse> {
    return this.http.delete<TypeEstablishmentResponse>(`${this.baseUrl}/type_establishment/${idTypeEstablishment}`);
  }


}