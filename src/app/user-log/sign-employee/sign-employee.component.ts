import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-employee',
  templateUrl: './sign-employee.component.html',
  styleUrl: './sign-employee.component.css'
})
export class SignEmployeeComponent {
  constructor(private router:Router){

  }
  
  signRegresar(): void {
    this.router.navigate(['/sign-regresar']);
  }

  
}


