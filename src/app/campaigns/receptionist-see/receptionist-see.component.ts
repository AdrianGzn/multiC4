import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';


@Component({
  selector: 'app-receptionist-see',
  templateUrl: './receptionist-see.component.html',
  styleUrl: './receptionist-see.component.css'
})
export class ReceptionistSeeComponent implements OnInit {
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
