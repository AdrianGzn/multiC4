import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl: string = 'http://127.0.0.1:8000';  

  constructor(private http: HttpClient) {}

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
