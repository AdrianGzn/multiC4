import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import Swal from 'sweetalert2';  // Importar SweetAlert2

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  campaniaForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  dataEstablishment: any = {};

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let currentDataEstablishment = localStorage.getItem("userData");

    if (currentDataEstablishment) {
      this.dataEstablishment = JSON.parse(currentDataEstablishment);
    }

    this.campaniaForm = new FormGroup({
      id_establecimiento: new FormControl(this.dataEstablishment.id_establecimiento, []),
      nombre: new FormControl('', Validators.required),
      descripción: new FormControl(''),
      dirección: new FormControl(''),
      público: new FormControl(''),
      fecha_inicio: new FormControl(''),
    });
  }

  onChangeSelectedOption($event: any): void {
    if ($event.target.files.length > 0) {
      this.selectedFile = $event.target.files[0];
      console.log(this.selectedFile);
    }
  }

  onSubmit() {
    Swal.fire({
      title: '¿Estás seguro de agregar la campaña?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar campaña',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecutar el proceso de agregar campaña
        if (!this.selectedFile) {
          alert('No se ha seleccionado ninguna imagen');
          return;
        }

        const formData = new FormData();
        Object.keys(this.campaniaForm.value).forEach(key => {
          formData.append(key, this.campaniaForm.value[key]);
        });

        if (this.selectedFile) {
          formData.append('file', this.selectedFile, this.selectedFile.name);
        }

        if (this.campaniaForm.valid) {
          console.log(formData.get("fecha_inicio"));
          this.generalService.createCampaign(formData).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        // Si el usuario cancela, no hacer nada
        console.log('Campaña no agregada');
      }
    });
  }
}
