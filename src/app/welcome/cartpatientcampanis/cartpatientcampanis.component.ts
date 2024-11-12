import { Component } from '@angular/core';

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

  serviciosIndex = 0;
  campaignsIndex = 0;
  visibleCards = 3;
  currentButton: 'prev' | 'next' | null = null;


  get visibleCampaigns() {
    return this.campaigns.slice(this.campaignsIndex, this.campaignsIndex + this.visibleCards);
  }
  prevCampaigns() {
    if (this.campaignsIndex > 0) {
      this.campaignsIndex--;
      this.currentButton = 'prev';
    }
  }

  nextCampaigns() {
    if (this.campaignsIndex < this.campaigns.length - this.visibleCards) {
      this.campaignsIndex++;
      this.currentButton = 'next';
    }
  }
}
