import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrl: './see.component.css'
})
export class SeeComponent implements OnInit {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos', 'En Espera', 'Cancelados']
  quotes: any[] = []; 

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let user = localStorage.getItem("userData")
    const finalUser = user ? JSON.parse(user): null;
    console.log(finalUser)
    this.generalService.getQuoteByIdStatus("atendidos", finalUser.id_usuario).subscribe()
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;  
  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;  
  }
}
