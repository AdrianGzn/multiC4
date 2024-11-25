import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  campaigns: any[] = [];
  dataEstablishment: any = {};
  myFormDelete: FormGroup;

  constructor(private generalService: GeneralServices) {
    this.myFormDelete = new FormGroup({
      selectedCampaign: new FormControl(0, [])
    });
  }

  ngOnInit(): void {
    let currentDataEstablishment = localStorage.getItem("userData");

    if (currentDataEstablishment) {
      this.dataEstablishment = JSON.parse(currentDataEstablishment);
    }

    this.generalService.getCampaigns(this.dataEstablishment.id_establecimiento).subscribe(
      (next) => {
        console.log(next);
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
    // SweetAlert2 para la confirmación de eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta campaña!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamamos al servicio para eliminar la campaña
        this.generalService.deleteCampaign(this.myFormDelete.value.selectedCampaign).subscribe(
          data => {
            console.log("Campaña eliminada");
            Swal.fire(
              'Eliminada!',
              'La campaña ha sido eliminada correctamente.',
              'success'
            );
            // Aquí puedes actualizar la lista de campañas o redirigir si es necesario
          },
          error => {
            console.log("Error al eliminar la campaña", error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la campaña.',
              'error'
            );
          }
        );
      }
    });
  }
}
