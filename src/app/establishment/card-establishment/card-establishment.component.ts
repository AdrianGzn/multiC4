import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faIcons, faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


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

  starsArray: boolean[] = [];
  faStar: IconProp = faStar;// Asignar el ícono de la estrella a una propiedad de la clase
  fullStars = 0; // Número de estrellas completas
  halfStar = 0;  // Número de estrellas medias

  constructor(
    private router: Router,
    private serviceAndEstablishmentData: ServiceAndEstablishmentDataService,
    private idSent: SharedDataService
  ) {}

  ngOnInit() {
    this.updateStars();  // Llamamos a la función para actualizar el arreglo de estrellas
  }

  updateStars() {
    // Si la calificación es 0, asignamos 1 estrella completa.
    this.fullStars = Math.max(1, Math.floor(this.card.promedio_calificacion));  // Asegura al menos 1 estrella completa
    this.halfStar = (this.card.promedio_calificacion - this.fullStars) >= 0.5 ? 1 : 0;  // Estrella media

    this.starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < this.fullStars) {
        this.starsArray.push(true);  // Estrella llena
      } else if (i === this.fullStars && this.halfStar === 1) {
        this.starsArray.push(false);  // Estrella media
        this.halfStar = 0;  // Solo una estrella media, no agregamos más
      } else {
        this.starsArray.push(false);  // Estrella vacía
      }
    }
  }

  details(): void {
    this.idSent.setId(this.card.id_establecimiento);
    this.router.navigate(['./establishment/details']);
  }
}
