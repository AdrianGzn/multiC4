import { Component } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
@Component({
  selector: 'app-seereceptionist',
  templateUrl: './seereceptionist.component.html',
  styleUrl: './seereceptionist.component.css'
})
export class SeereceptionistComponent {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos']
  quotesDoctor: any [] = [];

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    this.generalService.getAllQuotesByIdDoctor(1).subscribe(
      data => {
        this.quotesDoctor = data; 
      }
    )
    let user = localStorage.getItem("userData")
    const finalUser = user ? JSON.parse(user): null;
    console.log(finalUser)
    this.generalService.getQuoteByIdStatus(this.selectedOption, finalUser.id_usuario).subscribe(
    )
  }
  toggleSelect() {
    this.isOpen = !this.isOpen;  

  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;      
    let user = localStorage.getItem("userData")
    const finalUser = user ? JSON.parse(user): null;
    console.log(finalUser)
    this.generalService.getQuoteByIdStatus(this.selectedOption, finalUser.id_usuario).subscribe(
    )
  }

  deleteQuote($event: number): void  {
    this.generalService.deleteQuote($event).subscribe(
      data => {
        console.log(data)
      }
    )
  }
}
