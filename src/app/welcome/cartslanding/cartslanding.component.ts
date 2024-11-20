import { Component,OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cartslanding',
  templateUrl: './cartslanding.component.html',
  styleUrl: './cartslanding.component.css'
})
export class CartslandingComponent implements OnInit, OnDestroy {
  campaigns = [
    {
      image: 'assets/vac.jpeg',
      title: 'Vacunacion',
      description: 'Descripción de la campaña 1.',
      url: 'https://www.example.com/campana1',
    },
    {
      image: 'assets/nutr.jpeg',
      title: 'Nutricion',
      description: 'Descripción de la campaña 2.',
      url: 'https://www.example.com/campana2',
    },
    {
      image: 'assets/sex.jpeg',
      title: 'Educacion Sexual',
      description: 'Descripción de la campaña 3.',
      url: 'https://www.example.com/campana3',
    },
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia cada 5 segundos
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.campaigns.length;
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.campaigns.length) % this.campaigns.length;
  }

  moreInfo(campaign: any) {
    window.open(campaign.url, '_blank');
  }
}