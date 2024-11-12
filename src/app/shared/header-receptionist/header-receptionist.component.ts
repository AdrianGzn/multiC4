import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-receptionist',
  templateUrl: './header-receptionist.component.html',
  styleUrl: './header-receptionist.component.css'
})
export class HeaderReceptionistComponent {
  constructor(private router: Router) { }
  isCampaignMenuOpen = false;

  toggleCampaignMenu() {
    this.isCampaignMenuOpen = !this.isCampaignMenuOpen;
  }



  deleteCampaigns() {
    this.router.navigate(['/campaigns/delete']);
    
  }

  editCampaigns() {
    this.router.navigate(['/campaigns/details']);
  }
  addCampaign(){
   this.router.navigate(['/campaigns/update']);
  }
  
  welcome(): void {
    this.router.navigate(['/welcome/receptionist']);
  }

  establishments(): void {
    this.router.navigate(['/establishment/save']);
  }
  see(): void {
    this.router.navigate(['/appointments/receptionist']);
  }
  horarios(): void {
    this.router.navigate(['/schedules/scheduleEmployee']);
  }
  receptionistSee(): void {
    this.router.navigate(['/campaigns/receptionistSee']);
  }
  
  appointments(): void {
    this.router.navigate(['/appointments/receptionist']);
  }
  campaigns(): void {
    this.router.navigate(['/campaigns/receptionist']);
  }
  login(): void {
    this.router.navigate(['/sign-login']);
  }
  endSesion(): void {
    
  }

}
