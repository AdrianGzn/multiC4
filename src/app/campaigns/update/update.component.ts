import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent  {
  campaniaForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  constructor(private generalService: GeneralServices) {}
  ngOnInit(): void {
    this.campaniaForm = new FormGroup({
      id_establecimiento: new FormControl(31, []),
      nombre: new FormControl('', Validators.required),
      descripción: new FormControl(''),
      dirección: new FormControl(''),
      público: new FormControl(''),
      fecha_inicio: new FormControl(''),
    });
  }

  onChangeSelectedOption($event: any): void {
    if($event.target.files.length > 0 ) {
      this.selectedFile = $event.target.files[0]; 
      console.log(this.selectedFile)
    }
  }

  onSubmit() {
    if(!this.selectedFile) {
      alert("no se ha seleeccionado ninguna imagen")
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
      console.log(formData.get("fecha_inicio"))
      this.generalService.createCampaign(formData).subscribe(
        data => {
          console.log(data)
        },

        error => {
          console.log(error)
        }
      )
    }
  }
}
