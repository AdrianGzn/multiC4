import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-cartspatient',
  templateUrl: './cartspatient.component.html',
  styleUrls: ['./cartspatient.component.css']
})
export class CartspatientComponent implements OnInit {
  isOpen: boolean = false;
  slides: any[] = [];  
  userFinal: any = {};  
  currentSlide: number = 0;  
  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData");
    if (currentUser) {
      this.userFinal = JSON.parse(currentUser);
      console.log(this.userFinal);
    }
    this.fetchCampaigns();  
    this.startCarousel();   
  }

  fetchCampaigns() {
    const location = this.userFinal.localidad || 'defaultLocation'; 
    this.generalService.getCampaignsWithOut(location).subscribe(
      (data: any) => {
        console.log(data);
        this.slides = data.map((campaign: any) => ({
          image: campaign.image,  
          title: campaign.nombre,
          description: campaign.descripcion,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  
  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); 
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;  
  }

  selectOption(option: string) {
    console.log(option);
    this.isOpen = false;      
  }
}
