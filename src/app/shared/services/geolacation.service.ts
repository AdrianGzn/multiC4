import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  getPosition(): Observable<Location> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        console.log('La geolocalización no es soportada por este navegador.');
        observer.complete();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          };
          observer.next(location);
          observer.complete();
        },
        (error) => {
          observer.error(this.handleGeolocationError(error));
          observer.complete();
        }
      );
    });
  }

  private handleGeolocationError(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'El usuario negó el permiso de geolocalización.';
      case error.POSITION_UNAVAILABLE:
        return 'La información de ubicación no está disponible.';
      case error.TIMEOUT:
        return 'La solicitud de geolocalización ha expirado.';
      default:
        return 'Ocurrió un error desconocido al obtener la ubicación.';
    }
  }
}
