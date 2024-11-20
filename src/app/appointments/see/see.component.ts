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
  options: string[] = ['Atendidos', 'No Atendidos'];
  quotes: any[] = []; 

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    this.fetchQuotes(); 
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;  
  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;      
    this.fetchQuotes(); 
  }

  private fetchQuotes() {
    let user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;

    if (finalUser) {
      this.generalService.getQuoteByIdStatus(this.selectedOption, finalUser.id_usuario).subscribe((response: any[]) => {
        console.log(response)
        this.quotes = response.map(quote => ({
          id: quote.id,
          date: quote.date,
          status: quote.status,
          doctor: quote.doctor,
          description: quote.description
        }));
      });
    }
  }
}
