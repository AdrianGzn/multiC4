import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-cartslanding',
  templateUrl: './cartslanding.component.html',
  styleUrls: ['./cartslanding.component.css'],
})
export class CartslandingComponent implements OnInit {
  slides: any[] = [];
  userFinal: any = {};
  currentSlide: number = 0;

  isModalOpen: boolean = false;
  selectedCampaign: any = null;

  servicios = [
    { nombre: 'Odontología', img: '/assets/odontologia.jpeg', descripcion: 'Descripción de Odontología' },
    { nombre: 'Nutrición', img: '/assets/nutrision.jpeg', descripcion: 'Descripción de Nutrición' },
    { nombre: 'Ultrasonido', img: '/assets/ultrasonido.jpeg', descripcion: 'Descripción de Ultrasonido' },
    { nombre: 'Podología', img: '/assets/podologia.jpeg', descripcion: 'Descripción de Podología' },
    { nombre: 'Pediatría', img: '/assets/pediatria.jpeg', descripcion: 'Descripción de Pediatría' },
    { nombre: 'Ginecología', img: '/assets/ginecologia.jpeg', descripcion: 'Descripción de Ginecología' },
    { nombre: 'Dermatología', img: '/assets/dermatologia.jpeg', descripcion: 'Descripción de Dermatología' },
    { nombre: 'Cardiología', img: '/assets/cardiologia.jpeg', descripcion: 'Descripción de Cardiología' },
    { nombre: 'Fisiatría', img: '/assets/fisiatria.jpeg', descripcion: 'Descripción de Fisiatría' },
  ];

  serviciosIndex = 0;
  visibleCards = 3;
  modalVisible = false;
  servicioSeleccionado: any = null;

  windowWidth: number = window.innerWidth;

  constructor(private generalService: GeneralServices, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('userData');
    if (currentUser) {
      this.userFinal = JSON.parse(currentUser);
    }
    this.fetchCampaigns();
    this.startCarousel();
  }

  fetchCampaigns() {
    this.generalService.getCampignsByNameWithOut().subscribe(
      (data: any) => {
        this.slides = data.map((campaign: any) => ({
          image: campaign.image || 'defaultImage.jpg',
          title: campaign.campaign.nombre || 'Sin título',
          description: campaign.campaign.descripcion || 'Sin descripción',
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
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  moreInfo(slide: any) {
    this.selectedCampaign = slide;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCampaign = null;
  }

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
