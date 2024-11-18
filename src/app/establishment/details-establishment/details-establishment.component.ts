import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { Establishment } from '../../shared/models/establishment';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.css']
})
export class DetailsEstablishmentComponent implements OnInit{
  dataEstablishment: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  }

  constructor(private router: Router, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService) {}

  ngOnInit(): void {
    //Aquí se obtiene la data del establecimiento
  }

  generate(): void {
    this.router.navigate(['/appointments/generate']);
    if (this.serviceAndEstablishmentData.selectEstablishment(this.dataEstablishment)) {
      console.log('Datos del establecimiento guardados correctamente en el servicio.');
    } else {
      console.log('No se han podido guardar los datos en el servicio correctamente.');
    }
  }
}
