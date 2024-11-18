import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { authGuard } from '../welcome/guards/auth.guard';
const routes: Routes = [
    { path: 'details', component: DetailsEstablishmentComponent,  },
    { path: 'save', component: SaveEstablishmentComponent,canActivate: [authGuard]  },
    { path: 'search', component: SearchEstablishmentComponent,canActivate: [authGuard]  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EstablishmentRoutingModule { }
  