import { Component, DoCheck, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  campaigns: any[] = [];
  dataEstablishment: any = {}
  myFormDelete: FormGroup; 
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0, [])
  });
  }
  ngOnInit(): void {
    let currentDataEstablishment = localStorage.getItem("establishmentData")

    if(currentDataEstablishment) {
      this.dataEstablishment = JSON.parse(currentDataEstablishment)
    }
    this.generalService.getCampaigns(this.dataEstablishment.id_establecimiento).subscribe(
      (next) => {
        console.log(next)
        this.campaigns = next.map((campaign: any) => ({
          id_campania: campaign.campaign["id_campañas"],
          descripción: campaign.campaign.descripcion,
          dirección: campaign.campaign.dirección,
          fecha_inicio: campaign.campaign.fecha_inicio,
          id_establecimiento: campaign.campaign.id_establecimiento,
          nombre: campaign.campaign.nombre,
          público: campaign.campaign.púlico
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
