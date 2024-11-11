import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-receptionist',
  templateUrl: './header-receptionist.component.html',
  styleUrl: './header-receptionist.component.css'
})
export class HeaderReceptionistComponent {
  constructor(private router: Router) { }

  welcome(): void {
    this.router.navigate(['/welcome/receptionist']);
  }

  establishments(): void {
    this.router.navigate(['/establishment/receptionist']);
  }
  citas(): void {
    this.router.navigate(['/citas/receptionist']);
  }
  appointments(): void {
    this.router.navigate(['/appointments/receptionist']);
  }
  campaigns(): void {
    this.router.navigate(['/campaigns/receptionist']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    
  }

}
