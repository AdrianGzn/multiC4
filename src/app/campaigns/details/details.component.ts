import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  campaigns: any[] = [];
  myFormUpdate: FormGroup; 
  constructor(private generalService: GeneralServices) {
    this.myFormUpdate = new FormGroup({
      selectedCampaign: new FormControl(0, []),
      nombre: new FormControl('', []),
      descripción: new FormControl('', []),
      fecha_inicio: new FormControl('', [])
  });
  }
  ngOnInit(): void {
    this.generalService.getCampaigns(3).subscribe(
      (next) => {
        this.campaigns = next.map((campaign: any) => ({
          id_campania: campaign["id_campañas"],
          descripción: campaign.descripcion,
          dirección: campaign.dirección,
          fecha_inicio: campaign.fecha_inicio,
          id_establecimiento: campaign.id_establecimiento,
          nombre: campaign.nombre,
          público: campaign.púlico
        }))
      }
    )
  }

  submit(): void {
    const editCampaign = {
      "nombre": this.myFormUpdate.value.nombre,
      "descripción": this.myFormUpdate.value.descripción,
      "fecha_inicio": this.myFormUpdate.value.fecha_inicio
    }
    console.log(this.myFormUpdate.value.selectedCampaign)
    this.generalService.changeCampaign(this.myFormUpdate.value.selectedCampaign, editCampaign).subscribe(
      data => {
        console.log(data)
      },

      error => {
        console.log(error)
      }
    )
  }

}
