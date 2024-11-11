import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome-patient',
  templateUrl: './welcome-patient.component.html',
  styleUrls: ['./welcome-patient.component.css']
})
export class WelcomePatientComponent {
  constructor(private router: Router) { }

  establishments(): void {
    this.router.navigate(['/establishment/search']);
  }
}
