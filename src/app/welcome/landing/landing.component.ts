import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router, private userService: UserService) {}
 login(): void {
    this.router.navigate(['/sign-login']);
  }
  signPatient(): void {
    this.router.navigate(['/sign-patient']);
  }
}
