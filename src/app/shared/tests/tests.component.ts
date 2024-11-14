import { Component } from '@angular/core';
import { GeneralServices } from '../services/general-services.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent {
  constructor(private generalServices: GeneralServices, private userService: UserService) {}

  onSubmit(): void {
    //this.userService.
  }
}
