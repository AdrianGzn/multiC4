import { Component } from '@angular/core';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrl: './see.component.css'
})
export class SeeComponent {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos', 'En Espera', 'Cancelados'];

  toggleSelect() {
    this.isOpen = !this.isOpen;  
  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;  
  }
}
