import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent implements OnInit {
  type_options: any[] = [];
  formData: FormGroup;
  formUbication: FormGroup;
  formSchedule: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;
  selectedImage: File | null = null;
  userFinal: any | null = {}
  constructor(private generalServices: GeneralServices) {
    let userCurrent = localStorage.getItem("user"); 
    if(userCurrent) {
      this.userFinal = JSON.parse(userCurrent);
    }

    this.formData = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripción: new FormControl(null, [Validators.required]),
      id_tipo_establecimiento: new FormControl(null, [Validators.required]),
      categoria: new FormControl(null, [Validators.required])
    }),
      this.formUbication = new FormGroup({
        calle: new FormControl(null, [Validators.required]),
        colonia: new FormControl(null, [Validators.required]),
        numero: new FormControl(null),
        latitud: new FormControl(null),
        longitud: new FormControl(null)
      }),
      this.formSchedule = new FormGroup({
        entrada: new FormControl(null, [Validators.required]),
        salida: new FormControl(null, [Validators.required]),
      }),
      this.formServices = new FormGroup({
        servicio: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      }),
      this.formDoctors = new FormGroup({
        doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        servicioDoctor: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      })
  }

  ngOnInit(): void {
    this.generalServices.getTypeEstablishment().subscribe(
      (next) => {
        this.type_options = next;
        console.log(next)
      }
    )
  }

  onChangeSelectedImage(file: any): void {
    if (file.target.files.length > 0) {
      this.selectedImage = file.target.files[0];
    }
  }

  onSubmit() {
    this.generalServices.createSchedule(this.formSchedule.value).subscribe(
      (nextSchedule) => {
        if (nextSchedule) {
          console.log(nextSchedule)
          console.log(nextSchedule)
          this.generalServices.createAddress(this.formUbication.value).subscribe(
            (direccion) => {
              console.log(direccion)
              if (direccion) {
                console.log(direccion)
                const formDatEstablishment = new FormData();
                Object.keys(this.formData.value).forEach(element => {
                  formDatEstablishment.append(element, this.formData.value[element])
                });
                formDatEstablishment.append("id_dirección", direccion.id_dirección.toString())
                formDatEstablishment.append("id_horario", nextSchedule.id_horario.toString())
                if (this.selectedImage) {
                  formDatEstablishment.append('file', this.selectedImage, this.selectedImage.name);
                }

                if (this.formData.valid) {
                  this.generalServices.createEstablishment(formDatEstablishment).subscribe(
                    data => {
                      localStorage.setItem("establecimiento", JSON.stringify(data));
                      const editPerson = {
                        "id_establecimiento": data.id_establishment
                      }
                      this.generalServices.editRecepcionist(this.userFinal.id_usuario, editPerson).subscribe(
                        data => {
                          alert("se logro")
                        }
                      )
                    }
                  )
                }
              }
            }
          )
        }
      }
    )
  }
}