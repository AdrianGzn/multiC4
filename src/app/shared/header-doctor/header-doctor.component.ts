import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrl: './header-doctor.component.css'
})
export class HeaderDoctorComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  constructor(private router: Router, private userService: UserService) { }

  welcome(): void {
    this.router.navigate(['/welcome/doctor']);
  }
  horarios(): void {
    this.router.navigate(['/schedules/scheduleEmployee']);
  }

  seedoctor(): void {
    this.router.navigate(['/appointments/seedoctor']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/doctor']);
  }
  userDoctor(): void {
    this.router.navigate(['/campaigns/userDoctor']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    this.userService.logOut;
    this.router.navigate(['/sign-login'])
  }
}
