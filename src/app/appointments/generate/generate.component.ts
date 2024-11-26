import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../../shared/services/stripe.service';
import { QuoteResponse } from '../../shared/models/quote-response';
import { UserService } from '../../shared/services/user.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { DoctorResponse } from '../../shared/models/doctor-response';
import { SharedDataService } from '../../shared/services/shared-data.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent  {
  agendarCitaForm: FormGroup;
  services: any[] = [];
  doctorsByService: any[] = [ ];
  id: number = 0
  userFinal: any = {}
  costo: number = 0;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private userService: UserService,
    private generalServices: GeneralServices,
    private servicesAndEstablishmentData: ServiceAndEstablishmentDataService,
    private sharedId: SharedDataService,
    private router: Router
  ) {
    this.agendarCitaForm = this.fb.group({
      servicio: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      cost: [0]
    });
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData");

    if(currentUser) {
      this.userFinal = JSON.parse(currentUser);
    }
    this.sharedId.id$.subscribe(id => {
      this.id = id;
      console.log(id);
    });

    this.generalServices.getServiceDoctorById_establishment(this.id).subscribe(next => {
      console.log(next);
      next.map((item: any) => {
        this.services.push({
          id_service: item.id_service,
          service: item.service,
          cost: item.cost
        });
        this.doctorsByService.push({
          id_doctor: item.id_doctor,
          name: item.name
        });
      });
    });
  }

  onSelectService(): void {
    this.generalServices.getDoctorByService(this.agendarCitaForm.value.servicio).subscribe({
      next: (item: DoctorResponse[]) => {
        item.forEach((doctor: DoctorResponse) => {
          this.doctorsByService.push(doctor.name);
        });
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los doctores.');
        console.log(error);
      }
    });
  }

  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres agendar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agendar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se envía la cita
        this.agendarCita();
      }
    });
  }
  
  agendarCita(): void {
    console.log(this.agendarCitaForm.value);
    const newQuote = {
      id_usuario: this.userFinal.id_usuario,
      fecha: this.agendarCitaForm.value.fecha,
      estatus: "No Atendidos",
      horario: this.agendarCitaForm.value.hora,
      id_doctor: this.agendarCitaForm.value.doctor,
      id_servicio: this.agendarCitaForm.value.servicio
    };

    this.services.forEach((service) => {
      if(service.id_service === newQuote.id_servicio) {
        this.costo =  service.cost;
        console.log(this.costo);
      }
    });

    this.generalServices.createQuote(newQuote).subscribe(
      (next) => {
        Swal.fire("Generar cita", "Se logró generar la cita", "success");
      },
      error => {
        Swal.fire("Generar cita", "No se logró generar la cita", "error");
      }
    );  
  }

  generatePDF(quote: any): void {
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
  }
}
