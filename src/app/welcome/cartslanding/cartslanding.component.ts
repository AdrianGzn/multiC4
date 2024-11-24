import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-cartslanding',
  templateUrl: './cartslanding.component.html',
  styleUrls: ['./cartslanding.component.css'],
})
export class CartslandingComponent implements OnInit {
  isOpen: boolean = false;
  slides: any[] = [];
  userFinal: any = {};
  currentSlide: number = 0; 

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let currentUser = localStorage.getItem('userData');
    if (currentUser) {
      this.userFinal = JSON.parse(currentUser);
      console.log(this.userFinal);
    }
    this.fetchCampaigns();
    this.startCarousel(); 
  }


  fetchCampaigns() {
    const name = this.userFinal?.nombre || 'defaultName'; 
    this.generalService.getCampignsByNameWithOut(name).subscribe(
      (data: any) => {
        console.log(data);
        this.slides = data.map((campaign: any) => ({
          image: campaign.image || 'defaultImage.jpg', 
          title: campaign.nombre || 'Sin título',
          description: campaign.descripcion || 'Sin descripción',
        }));
      },
      (error) => {
        console.error('Error al obtener campañas', error);
      }
    );
  }

 
  getTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  startCarousel() {
    if (this.slides.length > 0) {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 3000); 
    }
  }

  moreInfo(slide: any) {
    console.log('Más información sobre:', slide);
    
  }
}
