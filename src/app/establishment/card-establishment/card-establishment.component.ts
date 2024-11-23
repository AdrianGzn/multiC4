import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent implements OnInit {
  @Input() card = { 
    id_establecimiento: 0,
    nombre: '',
    direccion:  {
      calle: '',
      colonia: '',
      descripcion: '',
      id_dirección: 0,
      latitud: 0,
      longitud: 0,
      numero: 0
    },
    image: '',
    promedio_calificacion: 0
  };

  @Output() emitCardId = new EventEmitter<number>(); 

  totalStars = 5;
  starsArray: number[] = [];
  establishments: any[] = []; 

  constructor(
    private router: Router,
    private serviceAndEstablishmentData: ServiceAndEstablishmentDataService,
    private generalServices: GeneralServices,
    private idSent: SharedDataService
  ) {}

  ngOnInit(): void {
    this.starsArray = Array(this.totalStars).fill(0);

    if (this.card.promedio_calificacion >= 0 && this.card.promedio_calificacion <= this.totalStars) {
      this.card.promedio_calificacion = Math.round(this.card.promedio_calificacion); 
    } else {
      this.card.promedio_calificacion = 0; 
    }

    // Obtener y ordenar los establecimientos por promedio_calificacion
    this.generalServices.getEstablishment().subscribe({
      next: (items: any[]) => {
        // Ordenar por calificación de mayor a menor
        this.establishments = items.sort(
          (a, b) => b.promedio_calificacion - a.promedio_calificacion
        );

        this.establishments.forEach((itemEstablishment: any) => {
          if (itemEstablishment.id_establecimiento === this.card.id_establecimiento) {
            this.serviceAndEstablishmentData.selectEstablishment(itemEstablishment);
          }
        });
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los establecimientos');
        console.log(error);
      }
    });
  }

  details(): void {
    this.idSent.setId(this.card.id_establecimiento);
    this.router.navigate(['./establishment/details']);
  }
}
