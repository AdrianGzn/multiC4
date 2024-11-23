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
  establishmentData: any = {}
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0, [])
  });
  }
  ngOnInit(): void {
    let currentEstablishment = localStorage.getItem("userData")

    if(currentEstablishment) {
       this.establishmentData = JSON.parse(currentEstablishment)
    }
    console.log(this.establishmentData)
    this.generalService.getCampaigns(this.establishmentData.id_establecimiento).subscribe(
      (next) => {
        this.campaigns = next.map((campaign: any) => ({
          id_campania: campaign["id_campañas"],
          descripción: campaign.campaign.descripcion,
          dirección: campaign.campaign.dirección,
          fecha_inicio: campaign.campaign.fecha_inicio,
          id_establecimiento: campaign.campaign.id_establecimiento,
          nombre: campaign.campaign.nombre,
          público: campaign.campaign.púlico,
          image: campaign.image
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
  searchByName(): void {
    this.generalService.getCampignsByName(this.establishmentData.id_establecimiento,this.myFormDelete.value.selectedCampaign).subscribe({
      next: (items) => {
        this.campaigns = items; 
      },
      error: (error) => {
        console.log("No se lograron obtener las campañas del establecimiento")
      }
    })
  }

  getOut(): void {
    this.campaigns = []
    this.ngOnInit()
  }
}
