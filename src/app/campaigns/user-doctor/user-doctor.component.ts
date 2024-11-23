import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-user-doctor',
  templateUrl: './user-doctor.component.html',
  styleUrls: ['./user-doctor.component.css']
})
export class UserDoctorComponent implements OnInit {
  campaigns: any[] = [];
  myFormDelete: FormGroup;
  campaignDoctor: any = {}
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0) 
    });
  }

  ngOnInit(): void {
    let currentDoctor = localStorage.getItem("userData")
    if(currentDoctor) {
      this.campaignDoctor = JSON.parse(currentDoctor)
    }
    this.generalService.getCampaigns(this.campaignDoctor.id_establecimiento).subscribe(
      (next) => {
        // Verifica si la respuesta tiene la estructura correcta antes de mapear
        console.log(next)
        if (Array.isArray(next)) {
          this.campaigns = next.map((campaign: any) => ({
            id_campania: campaign.campaign?.id_campañas,   // Usa el operador de encadenamiento opcional
            descripción: campaign.campaign?.descripcion,
            dirección: campaign.campaign?.dirección,
            fecha_inicio: campaign.campaign?.fecha_inicio,
            id_establecimiento: campaign.campaign?.id_establecimiento,
            nombre: campaign.campaign?.nombre,
            público: campaign.campaign?.púlico,
            image: campaign.image
          }));
        } else {
          console.error('La respuesta no es un arreglo válido', next);
        }
      },
      (error) => {
        console.error('Error al obtener las campañas', error);
      }
    );
  }

  submit(): void {
    const selectedCampaign = this.myFormDelete.value.selectedCampaign;

    if (selectedCampaign) {
      this.generalService.deleteCampaign(selectedCampaign).subscribe(
        data => {
          console.log("Campaña eliminada con éxito");
        },
        error => {
          console.error("Error al eliminar la campaña", error);
        }
      );
    } else {
      console.error("No se ha seleccionado ninguna campaña para eliminar");
    }
  }
}
