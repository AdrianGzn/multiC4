import { Component } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
@Component({
  selector: 'app-seedoctor',
  templateUrl: './seedoctor.component.html',
  styleUrl: './seedoctor.component.css'
})
export class SeedoctorComponent {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos']
  quotes: any[] = []; 
  quotesDoctor: any [] = [];
  doctorData: any = {}

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData")
    if(currentUser) {
      this.doctorData = JSON.parse(currentUser)
    }
    this.generalService.getQuotesByDoctorId(this.doctorData.id_doctor).subscribe(
      data => {
        console.log(data)
        this.quotesDoctor = data; 
      }
    )
    let user = localStorage.getItem("userData")
    const finalUser = user ? JSON.parse(user): null;
    console.log(finalUser)
    this.generalService.getQuotesByDoctorStatus(finalUser.id_usuario, this.selectedOption).subscribe(
    )
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;  

  }

  deleteQuote($event: number): void  {
    this.generalService.deleteQuote($event).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  selectOption(option: string) {
    this.selectedOption = option;  
    console.log(this.selectOption)
    this.isOpen = false;      
    let user = localStorage.getItem("userData")
    const finalUser = user ? JSON.parse(user): null;
    console.log(finalUser)
    this.generalService.getQuotesByDoctorStatus(finalUser.id_usuario, this.selectedOption).subscribe(
    )
  }
} 