import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cartpatient',
  templateUrl: './cartpatient.component.html',
  styleUrl: './cartpatient.component.css'
})
export class CartpatientComponent {
  constructor(private router: Router) { }

  servicios = [
    { nombre: 'Odontologia', img: '/assets/odontologia.jpeg' },
    { nombre: 'Nutricion', img: '/assets/nutrision.jpeg' },
    { nombre: 'Ultrasonido', img: '/assets/ultrasonido.jpeg' },
    { nombre: 'Podologia', img: '/assets/podologia.jpeg' },
    { nombre: 'Pedatria', img: '/assets/pediatria.jpeg' },
    { nombre: 'Ginecologia', img: '/assets/ginecologia.jpeg' },
    { nombre: 'Dermatologia', img: '/assets/dermatologia.jpeg' },
    { nombre: 'Cardiologia', img: '/assets/cardiologia.jpeg' },
    { nombre: 'Fisiatria', img: '/assets/fisiatria.jpeg' },
  ];

  serviciosIndex = 0;
  visibleCards = 3;
  modalVisible = false;
  servicioSeleccionado: any = null;

  get visibleServicios() {
    return this.servicios.slice(this.serviciosIndex, this.serviciosIndex + this.visibleCards);
  }

  prev() {
    if (this.serviciosIndex > 0) {
      this.serviciosIndex--;
    }
  }

  next() {
    if (this.serviciosIndex < this.servicios.length - this.visibleCards) {
      this.serviciosIndex++;
    }
  }

  abrirModal(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
