import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: 'save', component: SaveEstablishmentComponent, },
    { path: 'search', component: SearchEstablishmentComponent,  },
    { path: 'details', component: DetailsEstablishmentComponent,  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EstablishmentRoutingModule { }
  