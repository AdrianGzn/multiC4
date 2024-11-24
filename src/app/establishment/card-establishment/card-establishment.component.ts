import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent {
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

  starsArray: boolean[] = [];  // Arreglo para almacenar el estado de las estrellas

  constructor(
    private router: Router,
    private serviceAndEstablishmentData: ServiceAndEstablishmentDataService,
    private idSent: SharedDataService
  ) {}

  ngOnInit() {
    this.updateStars();  // Llamamos a la función para actualizar el arreglo de estrellas
  }

  updateStars() {
    // Limpiar el arreglo de estrellas
    this.starsArray = [];
    // Llenar el arreglo de estrellas basado en la calificación promedio
    for (let i = 0; i < 5; i++) {
      this.starsArray.push(i < Math.round(this.card.promedio_calificacion));  // Redondeamos la calificación
    }
  }

  details(): void {
    this.idSent.setId(this.card.id_establecimiento);
    this.router.navigate(['./establishment/details']);
  }
}
