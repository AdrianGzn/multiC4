import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrl: './header-doctor.component.css'
})
export class HeaderDoctorComponent {
  constructor(private router: Router) { }

  welcome(): void {
    this.router.navigate(['/welcome/doctor']);
  }

  schedules(): void {
    this.router.navigate(['/schedules/doctor']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/doctor']);
  }
  
  endSesion(): void {
    
  }
}
