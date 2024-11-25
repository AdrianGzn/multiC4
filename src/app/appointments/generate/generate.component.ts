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
import { SharedDataService } from '../../shared/services/shared-data.service';

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
  services: any[] = [];
  doctorsByService: any[] = [ ];
  id: number = 0
  constructor(private fb: FormBuilder, private stripeService: StripeService, private userService: UserService, private generalServices: GeneralServices, private servicesAndEstablishmentData: ServiceAndEstablishmentDataService, private sharedId: SharedDataService ) {
    this.agendarCitaForm = this.fb.group({
      servicio: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sharedId.id$.subscribe(
      id => {
        this.id = id;
        console.log(id)
      }
    )

    this.generalServices.getServiceDoctorById_establishment(3).subscribe(
      (next) => {
        next.map((item: any) => {
          this.services.push({
            id_service: item.id_service,
            service: item.service,
            cost: item.cost
          })
          this.doctorsByService.push({
            id_medic: item.id_doctor,
            name: item.name
          })
        }) 
        console.log(this.services)
        console.log(this.doctorsByService)
      }

    )
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
    console.log(this.agendarCitaForm.value);
    const { servicio, doctor, fecha, hora } = this.agendarCitaForm.value;
    
    const quote ={
      "quote_request": {
        "items": [
          {
            "name": `Servicio medico`,
            "product": `${servicio}`,
            "price": 100,
            "quantity": 1
          }
        ]
      },
      "quote_data": {
        "id_usuario": 123,
        "fecha": `${fecha}`,
        "horario": `${hora}`,
        "estatus": "pendiente",
        "id_doctor": 1,
        "id_servicio": 1
      }
    }
    
    console.log(quote);  
    this.stripeService.onCheckout(quote)  // Call the service to pass the quote to the backend
  }
  

  agendQuote(): void {
    this.generalServices.createQuote(this.agendarCitaForm.value).subscribe(
      (next) => {
        console.log(next)
      },

      error => {
        console.log(error)
      }
    )
  }
}
