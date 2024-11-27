import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  campaigns: any[] = [];
  myFormUpdate: FormGroup; 
  dataEstablishment: any = {}

  constructor(private generalService: GeneralServices) {
    this.myFormUpdate = new FormGroup({
      selectedCampaign: new FormControl(0, []),
      nombre: new FormControl('', []),
      descripción: new FormControl('', []),
      fecha_inicio: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    let currentDataEstablishment = localStorage.getItem("userData");

    if(currentDataEstablishment) {
      this.dataEstablishment = JSON.parse(currentDataEstablishment);
    }

    this.generalService.getCampaigns(this.dataEstablishment.id_establecimiento).subscribe(
      (next) => {
        this.campaigns = next.map((campaign: any) => ({
          id_campania: campaign.campaign["id_campañas"],
          descripción: campaign.campaign.descripcion,
          dirección: campaign.campaign.dirección,
          fecha_inicio: campaign.campaign.fecha_inicio,
          id_establecimiento: campaign.campaign.id_establecimiento,
          nombre: campaign.campaign.nombre,
          público: campaign.campaign.púlico
        }));
      }
    );
  }

  submit(): void {
    // SweetAlert2 para la confirmación de edición
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez guardados los cambios, no podrás deshacerlos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar cambios!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const editCampaign = {
          "nombre": this.myFormUpdate.value.nombre,
          "descripción": this.myFormUpdate.value.descripción,
          "fecha_inicio": this.myFormUpdate.value.fecha_inicio
        };

        this.generalService.changeCampaign(this.myFormUpdate.value.selectedCampaign, editCampaign).subscribe(
          data => {
            console.log(data);
            Swal.fire(
              '¡Guardado!',
              'Los cambios se han guardado correctamente.',
              'success'
            );
            // Puedes redirigir o actualizar la vista si es necesario
          },
          error => {
            console.log(error);
            Swal.fire(
              '¡Error!',
              'Hubo un problema al guardar los cambios.',
              'error'
            );
          }
        );
      }
    });
  }
}
