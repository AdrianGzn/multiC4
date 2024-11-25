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
import Swal from 'sweetalert2';

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
  userFinal: any = {}
  constructor(private fb: FormBuilder, private stripeService: StripeService, private userService: UserService, private generalServices: GeneralServices, private servicesAndEstablishmentData: ServiceAndEstablishmentDataService, private sharedId: SharedDataService ) {
    this.agendarCitaForm = this.fb.group({
      servicio: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData")

    if(currentUser) {
      this.userFinal = JSON.parse(currentUser)
    }
    this.sharedId.id$.subscribe(
      id => {
        this.id = id;
        console.log(id)
      }
    )

    this.generalServices.getServiceDoctorById_establishment(3).subscribe(
      (next) => {
        console.log(next)
        next.map((item: any) => {
          this.services.push({
            id_service: item.id_service,
            service: item.service,
            cost: item.cost
          })
          this.doctorsByService.push({
            id_doctor: item.id_doctor,
            name: item.name
          })
        }) 
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
    
    const quote ={
      "quote_request": {
        "items": [
          {
            "name": `Servicio medico`,
            "product": `${this.agendarCitaForm.value.servicio}`,
            "price": 100,
            "quantity": 1
          }
        ]
      },
      "quote_data": {
        "id_usuario": 123,
        "fecha": `${this.agendarCitaForm.value.fecha}`,
        "horario": `${this.agendarCitaForm.value.hora}`,
        "estatus": "pendiente",
        "id_doctor": 1,
        "id_servicio": 1
      }
    }

    const newQuote = {
      id_usuario: this.userFinal.id_usuario,
      fecha: this.agendarCitaForm.value.fecha,
      estatus: "No atendidos",
      horario: this.agendarCitaForm.value.hora,
      id_doctor: this.agendarCitaForm.value.doctor,
      id_servicio: this.agendarCitaForm.value.servicio
    }
    console.log(newQuote)
    this.generalServices.createQuote(newQuote).subscribe(
      (next) => {
        Swal.fire("Generar cita", "Se logor generar la cita", "success")
        this.stripeService.onCheckout(quote)        
      },

      error => {
        Swal.fire("Generar cita", "No se logro generar la cita")
      }
    );  
  // Call the service to pass the quote to the backend
  }
}
