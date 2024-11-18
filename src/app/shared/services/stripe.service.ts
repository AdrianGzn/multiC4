import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl: string = 'http://localhost:4100/quotes';
  private stripePromise = loadStripe('pk_test_51QA1JN04GnkleiMSULPFvf7K29JgGAwupkaVMMVYVJFOc4Rvo2HTY8PYWZzGSXkxYIOjpXTXPoT4QQ2I3CIv4nqp00sOEe4GOp');

  constructor(private http: HttpClient) {}

  onCheckout(quote: any): boolean {
    let status = false;
    this.http.post(this.baseUrl, quote).subscribe(async (res: any) => {
      const stripe = await this.stripePromise;
      stripe?.redirectToCheckout({sessionId: res.id});
      status = true;
    });
    return status;
  }
}
