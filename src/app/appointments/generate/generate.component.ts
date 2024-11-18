import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../../shared/services/stripe.service';
import { error } from 'console';
import { QuoteResponse } from '../../shared/models/quote-response';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Establishment } from '../../shared/models/establishment';
import { Service } from '../../shared/models/service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent  {
  agendarCitaForm: FormGroup;
  establishmentData: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  }
  services: Service[] = [];
  doctorsByService: User[] = [];

  constructor(private fb: FormBuilder, private stripeService: StripeService, private userService: UserService, private generalServices: GeneralServices, private servicesAndEstablishmentData: ServiceAndEstablishmentDataService) {
    this.agendarCitaForm = this.fb.group({
      servicio: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.establishmentData = this.servicesAndEstablishmentData.getEstablishment();
    //this.services = this.generalServices.getService
  }

  onSubmit(): void {
    if (this.agendarCitaForm.valid) {
      console.log(this.agendarCitaForm.value);

      let quote: QuoteResponse = {
        id_usuario: this.userService.getUser().id_usuario,
        fecha: this.agendarCitaForm.value.fecha,
        horario: this.agendarCitaForm.value.hora, 
        id_doctor: 0,
        id_servicio: 0
      }

      this.stripeService.onCheckout(quote);
    } else {
      console.log("Formulario inválido");
    }
  }
}
