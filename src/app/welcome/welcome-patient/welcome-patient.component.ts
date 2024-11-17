import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-welcome-patient',
  templateUrl: './welcome-patient.component.html',
  styleUrls: ['./welcome-patient.component.css']
})
export class WelcomePatientComponent implements OnInit {
  constructor(private router: Router, private generalService: GeneralServices, private userService: UserService) { }
  images: any[] = []; 
  campaigns: any[] = []
  services: any[] = []
  imageName: string = ""
  establishments(): void {
    this.router.navigate(['/establishment/search']);
  }

  ngOnInit(): void {

    this.generalService.getImages().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )

    this.generalService.getCampaigns(3).subscribe(
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

  checkout(): void {
    this.userService.onCheckout("ae")
  }
 
}
