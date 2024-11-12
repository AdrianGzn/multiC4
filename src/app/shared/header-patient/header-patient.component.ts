import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrl: './header-patient.component.css'
})
export class HeaderPatientComponent {
  constructor(private router: Router, private userService: UserService) { }

  welcome(): void {
    this.router.navigate(['/welcome/patient']);
  }

  establishments(): void {
    this.router.navigate(['/establishment/search']);
  }

  appointments(): void {
    this.router.navigate(['/appointments/patient']);
  }
  see(): void {
    this.router.navigate(['/appointments/see']);
  }

  userSee(): void {
    this.router.navigate(['/campaigns/userSee']);
  }
 
  endSesion(): void {
    this.userService.logOut;
    this.router.navigate(['/sign-login'])
  }

}