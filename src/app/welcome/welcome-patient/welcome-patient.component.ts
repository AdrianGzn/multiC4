import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-welcome-patient',
  templateUrl: './welcome-patient.component.html',
  styleUrls: ['./welcome-patient.component.css']
})
export class WelcomePatientComponent implements OnInit {
  constructor(private router: Router, private generalService: GeneralServices, private userService: UserService) { }

  images: any[] = []; 
  campaigns: any[] = []
  services: any[] = []
  imageName: string = ""
  
  // Variables para preguntas frecuentes
  answers: boolean[] = [false, false, false, false, false, false, false, false];
  showFirstGroup: boolean = true;

  // Navegación
  establishments(): void {
    this.router.navigate(["./establishment/search"]);
  }

  ngOnInit(): void {
    this.generalService.getImages().subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.generalService.getCampaigns(4).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.generalService.getService().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  checkout(): void {
    // Implementación futura
  }

  // Alternar entre grupos de preguntas
  toggleQuestionGroup() {
    this.showFirstGroup = !this.showFirstGroup;
  }

  // Mostrar u ocultar respuestas, cerrando las demás
  toggleAnswer(index: number) {
    this.answers = this.answers.map((_, i) => i === index ? !this.answers[i] : false);
  }
}
