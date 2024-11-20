import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartspatient',
  templateUrl: './cartspatient.component.html',
  styleUrls: ['./cartspatient.component.css'] // Corregido el nombre de la propiedad
})
export class CartspatientComponent implements OnInit { // Corregida la declaración de la clase
  slides = [
    {
      image: 'assets/vacu.jpeg',
      title: 'Título 1',
      description: 'Descripción de la primera imagen.',
    },
    {
      image: 'assets/budo.jpeg',
      title: 'Título 2',
      description: 'Descripción de la segunda imagen.',
    },
    {
      image: 'assets/inf.jpeg',
      title: 'Título 3',
      description: 'Descripción de la tercera imagen.',
    },
  ];

  currentSlide = 0;

  ngOnInit() {
    this.startCarousel();
  }

  getTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); 
  }
}
