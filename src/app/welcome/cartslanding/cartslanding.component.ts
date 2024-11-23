import { Component,OnInit, OnDestroy } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
@Component({
  selector: 'app-cartslanding',
  templateUrl: './cartslanding.component.html',
  styleUrl: './cartslanding.component.css'
})
export class CartslandingComponent implements OnInit, OnDestroy {
  campaigns: any[] = [];  
  currentIndex = 0;
  intervalId: any;

  constructor(private GeneralServices: GeneralServices) {}

  ngOnInit() {
    this.fetchCampaigns();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  fetchCampaigns() {
    const id_establishment = 1;  
    this.GeneralServices.getCampaigns(id_establishment).subscribe(
      (data: any) => {
        this.campaigns = data; 
      },
      (error) => {
        console.error('Error al obtener campañas', error);
      }
    );
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
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