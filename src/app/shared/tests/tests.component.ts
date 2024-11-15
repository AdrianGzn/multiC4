import { Component } from '@angular/core';
import { GeneralServices } from '../services/general-services.service';
import { UserService } from '../services/user.service';
import { GeolocationService } from '../services/geolacation.service';
import { Location } from '../models/location';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent {
  constructor(private generalServices: GeneralServices, private userService: UserService, private locationService: GeolocationService) {}

  center = { lat: 40.730610, lng: -73.935242 };
  zoom = 12; 

  latitud!: number;
  longitud!: number;
  error!: string;

  onSubmit(): void {
    this.getLocation();
    this.center.lat = this.latitud;
    this.center.lng = this.longitud;
  }

  getLocation(): void {
    this.locationService.getPosition().subscribe({
      next: (position: Location) => {
        this.latitud = position.latitud;
        this.longitud = position.longitud;
      },
      error: (err) => {
        this.error = err;
      }
    });
  }
}
