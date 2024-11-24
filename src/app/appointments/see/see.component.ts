import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { error } from 'console';

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
  userFinal: any = {}
  constructor(private generalService: GeneralServices) {}

  quotesDoctor: any [] = [];


  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData")
    if(currentUser) {
      this.userFinal = JSON.parse(currentUser)
      console.log(this.userFinal)
    }
    this.generalService.getAllQuotesByIdPatient(this.userFinal.id_usuario).subscribe(
      data => {
        console.log(data)
        this.quotesDoctor = data; 
      },

      error => {
        console.log(error)
      }
    )
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;  
  }

  selectOption(option: string) {
    this.selectedOption = option;  
    this.isOpen = false;      
    this.fetchQuotes()
  }

  fetchQuotes() {
    let user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;

    console.log(this.selectOption)
      this.generalService.getQuoteByIdStatus(this.selectedOption, this.userFinal.id_usuario).subscribe((response: any[]) => {
        this.quotes = response;
      });
    
  }
}
