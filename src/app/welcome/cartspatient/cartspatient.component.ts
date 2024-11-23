import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartspatient',
  templateUrl: './cartspatient.component.html',
  styleUrls: ['./cartspatient.component.css']
})
export class CartspatientComponent implements OnInit {
  slides = [
    {
      image: 'assets/salud.jpeg',
      title: 'Centro de Salud Central',
      description: 'El Centro de Salud Central es una moderna institución médica situada en el corazón de la ciudad. Su objetivo es ofrecer atención integral a la comunidad, con un equipo de profesionales altamente capacitados. Este centro se especializa en diversas áreas, tales como medicina general, cirugía, pediatría, ginecología, cardiología y urgencias, entre otras.',
    },
    {
      image: 'assets/consul.jpg',
      title: 'Centro de Salud Central',
      description: 'El Centro de Salud Central es una institución médica moderna ubicada en el centro de la ciudad, diseñada para brindar atención integral a la comunidad. Con un equipo de profesionales altamente calificados, el hospital se especializa en una variedad de áreas, como medicina general, cirugía, pediatría, ginecología, cardiología y urgencias, entre otras.',
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
