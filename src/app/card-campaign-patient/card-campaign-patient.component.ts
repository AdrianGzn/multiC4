import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Campaign } from '../shared/models/campaign';
@Component({
  selector: 'app-card-campaign-patient',
  templateUrl: './card-campaign-patient.component.html',
  styleUrl: './card-campaign-patient.component.css'
})
export class CardCampaignPatientComponent {
  @Input() campaign: Campaign  = {
    id_campaign: 0,
    nombre: '',
    descripcion: '',
    dirección: '',
    público: '',
    fecha_inicio: '',
    id_establecimiento: '',
    image: ''
   }
}
