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
  horarios(): void {
    this.router.navigate(['/schedules/scheduleEmployee']);
  }

  see(): void {
    this.router.navigate(['/appointments/see']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/doctor']);
  }
  userSee(): void {
    this.router.navigate(['/campaigns/userSee']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    localStorage.removeItem('dataUser');
    this.router.navigate(['/sign-login'])
  }
}
