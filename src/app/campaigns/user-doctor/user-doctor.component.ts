import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-user-doctor',
  templateUrl: './user-doctor.component.html',
  styleUrl: './user-doctor.component.css'
})
export class UserDoctorComponent implements OnInit {
  campaigns: any[] = [];
  myFormDelete: FormGroup; 
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0, [])
  });
  }
  ngOnInit(): void {
    this.generalService.getCampaigns(31).subscribe(
      (next) => {
          let data = []
          data = next; 
        if(next) {

        this.campaigns = next.map((campaign: any) => ({
          id_campania: campaign.campaign["id_campañas"],
          descripción: campaign.campaign.descripcion,
          dirección: campaign.campaign.dirección,
          fecha_inicio: campaign.campaign.fecha_inicio,
          id_establecimiento: campaign.campaign.id_establecimiento,
          nombre: campaign.campaign.nombre,
          público: campaign.campaign.púlico,
          image: campaign.image
        }))
       }
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
