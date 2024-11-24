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

@Injectable({
  providedIn: 'root'
})
export class GeneralServices {

  private baseUrl: string = 'http://3.227.141.174:8000';  

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

  getEstablishment(): Observable<EstablishmentGetResponse[]> {
    return this.http.get<EstablishmentGetResponse[]>(`${this.baseUrl}/establishment/`);
  }

  getEstablishmentByName(name_establishment: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchEstablishment/${name_establishment}`);
  }

  getEstablishmentByService(service: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByService/${service}`);
  }

  getEstablishmentByTypeCategory(type: string, category: string): Observable<EstablishmentShortResponse[]> {
    return this.http.get<EstablishmentShortResponse[]>(`${this.baseUrl}/findEstablishmentByTypeCategory/${type}/${category}`);
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

  createQuote(quotaData: QuoteResponse): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/quotes/`, quotaData);
  }

  getQuote(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/quotes/`);
  }

  changeRecepcionist(userModify: any, id_recepcionist: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id_recepcionist}`, userModify)
  }

  getQuoteByIdStatus(status: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quotesById/${id}/${status}`)
  }

  getQuoteByIdStatusDoctor(status: string, id: number, id_doctor: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuoteDoctorEstablishment/${id}/${id_doctor}/${status}`)
  }

  getQuoteByIdStatusRecepcionist( id_establishment: number,status: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuoteReceptioniestEstablishment/${id_establishment}/${status}`)
  }

  changeQuote(idQuote: number, quotesData: QuoteResponse): Observable<AddressResponse> {
    return this.http.put<AddressResponse>(`${this.baseUrl}/quotes/${idQuote}`, quotesData);
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
    return this.http.delete(`${this.baseUrl}/service/${id_service}`)
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

  getCampignsByName(location: string, id_establecimiento: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/campaignsByName/${id_establecimiento}/${location}`)
  }

  getCampignsByNameWithOut(name: string) {
    return this.http.get(`${this.baseUrl}/campaignsByNameWithOutId/${name}`)
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

  deleteCampaign(id_campaign: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/campaignDelete/${id_campaign}`)
  }

  //services
  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services/`)
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

  getAllQuotesByIdDoctor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuoteDoctor/${id}`)
  }

  getAllQuotesByIdPatient(id_patient: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuotePatient/${id_patient}`)
  }


  getAllQuotesByIdEstablishmentStatus(id_establishment: number, status:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuoteReceptioniestEstablishment/${id_establishment}/${status}`)
  }

  getAllQuotesDoctorByIdEstablishmentStatus(id_establishment: number, status:string, id_doctor: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allQuoteDoctorEstablishment/${id_establishment}/${id_doctor}/${status}`)
  }


  getServiceDoctorById_establishment(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allServiceDoctorById_establishment/${id_establishment}`)
  }

  getAllInformtaionServiceById(id_establishment: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/allInformationServiceById/${id_establishment}`)
  }
}