import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-employee',
  templateUrl: './sign-employee.component.html',
  styleUrls: ['./sign-employee.component.css']  
})
export class SignEmployeeComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      usernameGroup: this.fb.group({
        username: ['', Validators.required],
      }),
      roleGroup: this.fb.group({
        role: ['', Validators.required],
      }),
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
      }),
      confirmPasswordGroup: this.fb.group({
        confirmPassword: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
  
    }
  }

  signRegresar(): void {
    this.router.navigate(['/sign-regresar']);
  }
}
