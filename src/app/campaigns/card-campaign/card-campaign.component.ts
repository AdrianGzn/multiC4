import { Component } from '@angular/core';
import { Campaign } from '../../shared/models/campaign';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card-campaign',
  templateUrl: './card-campaign.component.html',
  styleUrl: './card-campaign.component.css'
})
export class CardCampaignComponent {
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
