import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cartpatientcampanis',
  templateUrl: './cartpatientcampanis.component.html',
  styleUrl: './cartpatientcampanis.component.css'
})
export class CartpatientcampanisComponent {
  campaigns = [
    { image: '/assets/vacunacion.jpeg', title: 'Vacunación' },
    { image: '/assets/sexuales.jpeg', title: 'Educación Sexual' },
    { image: '/assets/nutricion.jpeg', title: 'Nutrición' },
    { image: '/assets/nutricion.jpeg', title: 'Nutrición' },
    { image: '/assets/nutricionsss.jpeg', title: 'Nutrición' },
    { image: '/assets/nutricionaaa.jpeg', title: 'Nutrición' },
    { image: '/assets/nutricionwww.jpeg', title: 'Nutrición' },
  ];
  campaignsIndex = 0;
  visibleCards = 3;
  windowWidth: number = window.innerWidth;

  // Actualiza el tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    // Cambiar la cantidad de cards visibles dependiendo del tamaño de la ventana
    if (this.windowWidth < 768) {
      this.visibleCards = 1; // Muestra solo una card a la vez en pantallas pequeñas
    } else {
      this.visibleCards = 3; // Muestra tres cards en pantallas grandes
    }
  }

  get visibleCampaigns() {
    return this.campaigns.slice(this.campaignsIndex, this.campaignsIndex + this.visibleCards);
  }

  prevCampaigns() {
    if (this.campaignsIndex > 0) {
      this.campaignsIndex--;
    }
  }

  nextCampaigns() {
    if (this.campaignsIndex < this.campaigns.length - this.visibleCards) {
      this.campaignsIndex++;
    }
  }
}
