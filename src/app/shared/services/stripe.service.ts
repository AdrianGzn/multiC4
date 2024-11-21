import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl: string = 'http://127.0.0.1:8000/stripeQuotes';
  private stripePromise = loadStripe('pk_test_51QA1JN04GnkleiMSULPFvf7K29JgGAwupkaVMMVYVJFOc4Rvo2HTY8PYWZzGSXkxYIOjpXTXPoT4QQ2I3CIv4nqp00sOEe4GOp');

  constructor(private http: HttpClient) {}

  onCheckout(quote: any): boolean {
    let status = false;
    this.http.post(this.baseUrl, quote).subscribe(async (res: any) => {
      const stripe = await this.stripePromise;
      stripe?.redirectToCheckout({sessionId: res.session_id});
      status = true;
    });
    return status;
  }

  generatePdf(paymentIntentId: string): void {
    const payload = { paymentIntentId };
    
    this.http.post('http://localhost:8000/generate-pdf', payload, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `factura_${paymentIntentId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }, (error) => {
        console.error('Error al generar el PDF:', error);
      });
  }
  
}
