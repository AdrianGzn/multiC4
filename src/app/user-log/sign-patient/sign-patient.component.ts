import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-patient',
  templateUrl: './sign-patient.component.html',
  styleUrl: './sign-patient.component.css'
})
export class SignPatientComponent {
  constructor(private router:Router){

  }
  signEmployee(): void {
    this.router.navigate(['/sign-employee']);
  }
  
}
