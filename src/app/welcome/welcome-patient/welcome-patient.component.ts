import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';
@Component({
  selector: 'app-welcome-patient',
  templateUrl: './welcome-patient.component.html',
  styleUrls: ['./welcome-patient.component.css']
})
export class WelcomePatientComponent implements OnInit {
  constructor(private router: Router, private generalService: GeneralServices) { }

  campaigns: any[] = []
  services: any[] = []
  establishments(): void {
    this.router.navigate(['/establishment/search']);
  }

  ngOnInit(): void {
    this.generalService.getCampaigns().subscribe(
      data => {
        console.log(data)
      },

      error => {
        console.log(error)
      }
    )

    this.generalService.getService().subscribe(
      data => {
        console.log(data)
      },

      error => {
        console.log(error)
      }
    )
  }
 
}
