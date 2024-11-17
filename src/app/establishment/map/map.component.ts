import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'] // Corregido
})
export class MapComponent implements OnInit {
  @Input() DataMap = {
    lat: 0,
    lng: 0,
  }; // Asegúrate de inicializar correctamente las propiedades.
  @Input() zoom: number = 12;

  constructor() {}

  ngOnInit(): void {
    // Puedes inicializar o realizar tareas adicionales aquí.
  }
}
