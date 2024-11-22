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
  establishmentData: any = {}
  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let currentEstablishment = localStorage.getItem("establishmentData")

    if(currentEstablishment) {
       this.establishmentData = JSON.parse(currentEstablishment)
    }
    this.generalService.getAllQuotesByIdEstablishmentStatus(this.establishmentData.id_establecimiento, this.selectedOption).subscribe(
      data => {
        this.quotesDoctor = data; 
      }
    )
  }
  toggleSelect() {
    this.isOpen = !this.isOpen;  

  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;      
    this.generalService.getAllQuotesByIdEstablishmentStatus(this.establishmentData.id_establecimiento, this.selectedOption).subscribe(
      
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
