import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrl: './header-patient.component.css'
})
export class HeaderPatientComponent {
  constructor(private router: Router) { }

  welcome(): void {
    this.router.navigate(['/welcome/patient']);
  }

  establishments(): void {
    this.router.navigate(['/establishment/patient']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/patient']);
  }
  campaigns(): void {
    this.router.navigate(['/campaigns/patient']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    
  }

}
