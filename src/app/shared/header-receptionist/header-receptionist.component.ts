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

  appointments(): void {
    this.router.navigate(['/appointments/receptionist']);
  }

  endSesion(): void {
    
  }

}
