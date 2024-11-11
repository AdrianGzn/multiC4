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
    this.router.navigate(['/establishment/search']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/patient']);
  }
  campaigns(): void {
    this.router.navigate(['/campaigns/patient']);
  }
  citas(): void {
    this.router.navigate(['/citas/patient']);
  }
  endSesion(): void {
    localStorage.removeItem('dataUser');
    this.router.navigate(['/sign-login'])
  }

}