import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header-receptionist',
  templateUrl: './header-receptionist.component.html',
  styleUrl: './header-receptionist.component.css'
})
export class HeaderReceptionistComponent {
  isMobileMenuOpen = false;
  isCampaignMenuOpen = false;
  isCampaignMenuOpenMobile = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleCampaignMenu() {
    this.isCampaignMenuOpen = !this.isCampaignMenuOpen;
  }

  toggleCampaignMenuMobile() {
    this.isCampaignMenuOpenMobile = !this.isCampaignMenuOpenMobile;
  }
  constructor(private router: Router, private userService: UserService) { }


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
  seereceptionist(): void {
    this.router.navigate(['/appointments/seereceptionist']);
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
    this.userService.logOut;
    this.router.navigate(['/sign-login'])
  }

}
