import { Component } from '@angular/core';

@Component({
  selector: 'app-cartpatient',
  templateUrl: './cartpatient.component.html',
  styleUrl: './cartpatient.component.css'
})
export class CartpatientComponent {
  servicios = [
    { nombre: 'ODONTOLOGIA', img: '/assets/odontologia.jpeg' },
    { nombre: 'NUTRICION', img: '/assets/nutricion.jpeg' },
    { nombre: 'ULTRASONIDO', img: '/assets/ultrasonido.jpeg' },
    { nombre: 'PODOLOGIA', img: '/assets/podologia.jpeg' }
  ];

  
  serviciosIndex = 0;
  campaignsIndex = 0;
  visibleCards = 3;
  currentButton: 'prev' | 'next' | null = null;

  get visibleServicios() {
    return this.servicios.slice(this.serviciosIndex, this.serviciosIndex + this.visibleCards);
  }
  prev() {
    if (this.serviciosIndex > 0) {
      this.serviciosIndex--;
      this.currentButton = 'prev';
    }
  }

  next() {
    if (this.serviciosIndex < this.servicios.length - this.visibleCards) {
      this.serviciosIndex++;
      this.currentButton = 'next';
    }
  }
}
