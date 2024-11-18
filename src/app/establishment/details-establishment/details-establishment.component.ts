import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServices } from '../../shared/services/general-services.service';
import { serviceEstablishment } from '../../shared/models/serviceEstablishment';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.css']
})
export class DetailsEstablishmentComponent implements OnInit {
  
  serviceEstablishment: serviceEstablishment[] = []
  constructor(private router: Router, private generalService: GeneralServices) {}

  ngOnInit(): void {
    this.generalService.getServiceEstablishemnt(29).subscribe(
      data => {
        this.serviceEstablishment = data;
        console.log(this.serviceEstablishment)
      }
    )
  }

  generate(): void {
    this.router.navigate(['/appointments/generate']);
  }
}
