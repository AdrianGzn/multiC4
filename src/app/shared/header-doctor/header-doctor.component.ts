import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrl: './header-doctor.component.css'
})
export class HeaderDoctorComponent {
  constructor(private router: Router) { }

  horarios(): void {
    this.router.navigate(['/horarios/doctor']);
  }

  citas(): void {
    this.router.navigate(['/citas/doctor']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/doctor']);
  }
  campaigns(): void {
    this.router.navigate(['/campaigns/doctor']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    
  }
}
