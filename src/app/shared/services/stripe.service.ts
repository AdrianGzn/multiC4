import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl: string = 'http://3.227.141.174:8000/stripeQuotes';
  private stripePromise = loadStripe('pk_test_51QA1JN04GnkleiMSULPFvf7K29JgGAwupkaVMMVYVJFOc4Rvo2HTY8PYWZzGSXkxYIOjpXTXPoT4QQ2I3CIv4nqp00sOEe4GOp');

  constructor(private http: HttpClient) {}

  onCheckout(quote: any): boolean {
    let status = false;
    this.http.post(this.baseUrl, quote).subscribe(async (res: any) => {
      const stripe = await this.stripePromise;
      stripe?.redirectToCheckout({sessionId: res.session_id});
      status = true;

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Detalles de la Cita Médica", 20, 20);
  
      doc.setFontSize(12);
      doc.text(`Folio: ${quote.quote_data.id_servicio}`, 20, 40);
      doc.text(`Servicio: ${quote.quote_request.items[0].product}`, 20, 50);
      doc.text(`Fecha: ${quote.quote_data.fecha}`, 20, 60);
      doc.text(`Hora: ${quote.quote_data.horario}`, 20, 70);
      doc.text(`Doctor: ${quote.quote_data.id_doctor}`, 20, 80);
      doc.text(`Costo: $${quote.quote_request.items[0].price}`, 20, 90);
      doc.text("¡Descargar PDF!", 20, 100);
      doc.save('cita_medica.pdf');
    });
    return status;
  }
}
