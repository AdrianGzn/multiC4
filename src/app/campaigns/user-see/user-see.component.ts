import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-user-see',
  templateUrl: './user-see.component.html',
  styleUrl: './user-see.component.css'
})
export class UserSeeComponent implements OnInit {
  campaigns: any[] = [];
  myFormDelete: FormGroup; 
  userFinal: any = {}
  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl('')  // Asegúrate de que el valor predeterminado sea válido
    });
  }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData")

    if(currentUser) {
      this.userFinal = JSON.parse(currentUser)
    }

    this.generalService.getCampaignsWithOut(this.userFinal.localidad).subscribe(
      (next) => {
        console.log(next)
        // Verifica si la respuesta tiene la estructura correcta antes de mapear
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


  searchByName(): void {
    this.generalService.getCampignsByName(this.userFinal.localidad, this.myFormDelete.value).subscribe({
      next: (items: any) => {
        console.log(items)
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
