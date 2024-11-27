import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';

// Interfaz para las campañas
interface Campaign {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-cartslanding',
  templateUrl: './cartslanding.component.html',
  styleUrls: ['./cartslanding.component.css'],
})
export class CartslandingComponent implements OnInit {
  slides: Campaign[] = []; 
  userFinal: any = {};
  currentSlide: number = 0;

  isModalOpen: boolean = false;
  selectedCampaign: Campaign | null = null;

  servicios = [
    { 
      nombre: 'Odontología', 
      img: '/assets/odontologia.jpeg', 
      descripcion: 'Atención profesional para el cuidado, prevención y tratamiento de enfermedades dentales y bucales.' 
    },
    { 
      nombre: 'Nutrición', 
      img: '/assets/nutrision.jpeg', 
      descripcion: 'Asesoramiento personalizado para mejorar hábitos alimenticios y lograr una alimentación equilibrada y saludable.' 
    },
    { 
      nombre: 'Ultrasonido', 
      img: '/assets/ultrasonido.jpeg', 
      descripcion: 'Diagnóstico por imágenes para la evaluación precisa de órganos y tejidos internos mediante ultrasonido.' 
    },
    { 
      nombre: 'Podología', 
      img: '/assets/podologia.jpeg', 
      descripcion: 'Cuidado especializado para la prevención, diagnóstico y tratamiento de problemas en los pies.' 
    },
    { 
      nombre: 'Pediatría', 
      img: '/assets/pediatria.jpeg', 
      descripcion: 'Atención médica integral para el crecimiento y desarrollo saludable de niños y adolescentes.' 
    },
    { 
      nombre: 'Ginecología', 
      img: '/assets/ginecologia.jpeg', 
      descripcion: 'Servicios médicos enfocados en la salud reproductiva y bienestar general de la mujer.' 
    },
    { 
      nombre: 'Dermatología', 
      img: '/assets/dermatologia.jpeg', 
      descripcion: 'Diagnóstico y tratamiento de enfermedades y afecciones de la piel, cabello y uñas.' 
    },
    { 
      nombre: 'Cardiología', 
      img: '/assets/cardiologia.jpeg', 
      descripcion: 'Prevención y tratamiento de enfermedades relacionadas con el corazón y el sistema circulatorio.' 
    },
    { 
      nombre: 'Fisiatría', 
      img: '/assets/fisiatria.jpeg', 
      descripcion: 'Rehabilitación física y terapias para mejorar la calidad de vida de personas con discapacidades o lesiones.' 
    },
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

  // Método para obtener las campañas
  fetchCampaigns(): void {
    this.generalService.getCampignsByNameWithOut().subscribe(
      (data: any) => {
        this.slides = data.map((campaign: any) => ({
          image: campaign.image || 'defaultImage.jpg', // Usar valor por defecto si no hay imagen
          title: campaign.campaign.nombre || 'Sin título',        // Usar valor por defecto si no hay título
          description: campaign.campaign.descripción || 'Sin descripción',  // Usar valor por defecto si no hay descripción
        }));
      },
      (error) => {
        console.error('Error al obtener campañas', error);
      }
    );
  }

  // Método para calcular la transformación del carrusel
  getTransform(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  // Método para iniciar el carrusel
  startCarousel(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);  // Cambiar de diapositiva cada 3 segundos
  }

  // Método para mostrar más información de una campaña al hacer clic
  moreInfo(slide: Campaign): void {
    this.selectedCampaign = slide;  // Asignar la campaña seleccionada
    this.isModalOpen = true;        // Abrir el modal
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;  // Cerrar el modal
    this.selectedCampaign = null;  // Limpiar la campaña seleccionada
  }

  // Métodos para navegar entre los servicios
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

  // Métodos para abrir y cerrar el modal de servicios
  abrirModal(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
