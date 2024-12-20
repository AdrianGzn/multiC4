import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { AddressResponse } from '../models/address-response';
import { Bill } from '../models/bill';
import { BillResponse } from '../models/bill-response';
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
import { EstablishmentGetResponse } from '../models/establishment-get-response';
import { ScheduleDoctorToPut } from '../models/schedule-doctor-to-put';
import { EstablishmentServiceInterface } from '../models/establishment-service-interface';
import { QuoteToPut } from '../models/quote-to-put';
import { QuoteToResponse } from '../models/quote-to-response';
import { braiting } from '../models/braiting';

@Injectable({
  providedIn: 'root'
})
export class GeneralServices {

  private baseUrl: string = 'http://54.205.244.43:8000';  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/`)
  }

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

  getEstablishment(): Observable<EstablishmentGetResponse[]> {
    return this.http.get<EstablishmentGetResponse[]>(`${this.baseUrl}/establishment/`);
  }

  getEstablishmentByName(name_establishment: string, location: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishment/${name_establishment}/${location}`);
  }

  getEstablishmentByService(service: string, location: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByService/${service}/${location}`);
  }

  getEstablishmentByTypeCategory(type: string, category: string, location: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByTypeCategory/${type}/${category}/${location}`);
  }

  createEstablishment(establishmentData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/establishment/`, establishmentData);
  }

  changeEstablishment(idEstablishment: number, estabishmentData: EstablishmentResponse): Observable<EstablishmentResponse> {
    return this.http.put<EstablishmentResponse>(`${this.baseUrl}/establishment/${idEstablishment}`, estabishmentData);
  }

  deleteEstablishment(idEstablishment: number): Observable<EstablishmentResponse> {
    return this.http.delete<EstablishmentResponse>(`${this.baseUrl}/establishment/${idEstablishment}`);
  }

  createQuote(quotaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quotes/`, quotaData);
  }

  getQuote(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/quotes/`);
  }

  changeRecepcionist(userModify: any, id_recepcionist: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id_recepcionist}`, userModify)
  }

  changeQuote(idQuote: number, quotesData: any): Observable<QuoteToResponse> {
    return this.http.put<QuoteToResponse>(`${this.baseUrl}/quotes/${idQuote}`, quotesData);
  }

  deleteQuote(idQuote: number): Observable<QuoteResponse> {
    return this.http.delete<QuoteResponse>(`${this.baseUrl}/quotes/${idQuote}`);
  }
  
  establishmentInformation(location: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allImagesEstablishment/${location}`)
  }

  createSchedule(scheduleData: ScheduleResponse): Observable<Schedule> {
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

  changeScheduleDoctor(idSchedule: number, scheduleData: ScheduleDoctorToPut): Observable<ScheduleDoctorToPut> {
    return this.http.put<ScheduleDoctorToPut>(`${this.baseUrl}/scheduleDoctor/${idSchedule}`, scheduleData);
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

  changeServiceEstablishment(idService: number, serviceData: any): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${this.baseUrl}/services/${idService}`, serviceData);
  }

  deleteService(id_service: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/services/${id_service}`);
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

  //campaigns
  getCampaigns(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaigns/${id_establishment}`)
  }

  getCampignsByName(location: string, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaignsByName/${name}/${location}`)
  }

  getCampignsByIdEstablishmentName(id_establishment: number, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaignsByEstablishmentName/${id_establishment}/${name}`)
  }

  getCampignsByNameWithOut() {
    return this.http.get(`${this.baseUrl}/campaignsWithOut/`)
  }

  getCampaignsWithOut(location: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaignsAll/${location}`)
  }

  changeCampaign(id_campaign: number,campaign: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/campaigns/${id_campaign}`, campaign)
  }

  createCampaign(campaign: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/campaigns/`, campaign)
  }

  asignDoctorEstablishment(id_doctor: number, asignDoctor: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id_doctor}`, asignDoctor)
  }

  deleteCampaign(id_campaign: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/campaignDelete/${id_campaign}`)
  }

  //services
  getServices(): Observable<EstablishmentServiceInterface[]> {
    return this.http.get<EstablishmentServiceInterface[]>(`${this.baseUrl}/allServices/`)
  }


  //get images S3
  editRecepcionist(id_recepcionist: number, userModify: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id_recepcionist}`, userModify)
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allImagesEstablishment/`)
  }

  getAllHorsById(id_medic: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDataHours/${id_medic}`)
  }


  getServiceEstablishemnt(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allInformationIdEstablish/${id_establishment}`)
  }

  getDoctorByService(id_service: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allSerivcesDoctor/${id_service}`)
  }

  //Todos los get de Quotes

  getQuotesByDoctorId(id_doctor: number): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesDoctorById/${id_doctor}`)
  }

  getAllQuotesByIdPatient(id_patient: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuotePatient/${id_patient}`)
  }


  getQuotesByPatientIdStatus(id_patient: number, status: string): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdPatientWith/${id_patient}/${status}`)
  }

  getQuotesByPatientId(id_patient: number): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/allQuotePatient/${id_patient}`)
  }


  getQuotesByReceptionistId(id_recepcionist: number): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdReceptionist/${id_recepcionist}`)
  }  

  getQuotesByDoctorStatus(id_doctor: number, status: string): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdDoctorWith/${id_doctor}/${status}`)
  }  

  getQuotesByReceptionisStatus(id_doctor: number, status: string): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdEstablishment/${id_doctor}/${status}`)
  }  

  getQuotesByPatientStatus(id_patient: number, status: string): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdPatientWith/${id_patient}/${status}`)
  }

  getQuotesByEstablishmentStatus(id_establishment: number, status: string): Observable<QuoteResponse[]> {
    return this.http.get<QuoteResponse[]>(`${this.baseUrl}/quotesByIdReceptionist/${id_establishment}/${status}`)
  }

  //Se terminan los gets de Quotes

  getServiceDoctorById_establishment(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allServiceDoctorById_establishment/${id_establishment}`)
  }

  getAllInformtaionServiceById(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allInformationServiceById/${id_establishment}`)
  }

  postStars(braiting: braiting): Observable<braiting> {
    return this.http.post<braiting>(`${this.baseUrl}/braiting/`, braiting)
  }
}