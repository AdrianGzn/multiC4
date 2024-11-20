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
import { DoctorResponse } from '../../shared/models/doctor-response';

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
  services: string[] = [];
  doctorsByService: string[] = [];

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
    this.generalServices.getServices().subscribe({
      next: (item) => {
        console.log('Servicios obtenidos correctamente');

        item.forEach((service: Service) => {
          if (service.id_stablishment === this.establishmentData.id_establishment) {
            this.services.push(service.tipo);
          }
        });

        console.log(item);
      },
      error: (error) => {
        console.log('No se ha podido obtener los servicios');
        console.log(error);
      }
    })
  }

  onSelectService(): void {
    this.generalServices.getDoctorByService(0).subscribe({
      next: (item: DoctorResponse[]) => {
        item.forEach((doctor: DoctorResponse) => {
          this.doctorsByService.push(doctor.name);
        });
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los doctores.');
        console.log(error);
      }
    })
  }

  onSubmit(): void {
    if (this.agendarCitaForm.valid) {
      console.log(this.agendarCitaForm.value);
 
      let quote: any = {
        "items": [
          {
            "name": 'Cita',
            "product": "https://via.placeholder.com/150",
            "precio": this.servicesAndEstablishmentData.getService().costo,
            "quantity": 1
          }
        ]
      }

      this.stripeService.onCheckout(quote);
    } else {
      console.log("Formulario inválido");
    }
  }
}
