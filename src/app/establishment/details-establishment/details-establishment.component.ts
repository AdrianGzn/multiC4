import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.css']
})
export class DetailsEstablishmentComponent {
  center = { lat:16.617901807301678, lng: -93.09724099999998 };
  zoom = 15; 
  

  constructor(private router: Router) {}

  generate(): void {
    this.router.navigate(['/appointments/generate']);
  }
}
