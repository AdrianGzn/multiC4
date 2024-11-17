import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  campaigns: any[] = [];
  myFormDelete: FormGroup; 
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0, [])
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
    this.generalService.deleteCampaign(this.myFormDelete.value.selectedCampaign).subscribe(
      data => {
        console.log("ok")
      },
      error => {
        console.log("error")
      }
    )
  }


}
