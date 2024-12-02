import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CardQuoteComponent } from './welcome/card-quote/card-quote.component';
import { QuotePatientComponent } from './appointments/quote-patient/quote-patient.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CardQuoteComponent,
    

  ],
  imports: [   
    SweetAlert2Module.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
 
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
