import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.css']
})
export class DetailsEstablishmentComponent {
  

  constructor(private router: Router) {}

  generate(): void {
    this.router.navigate(['/appointments/generate']);
  }
}
