import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { GeneralsComponent } from './generals/generals.component';
import { ReceptionistSeeComponent } from './receptionist-see/receptionist-see.component';
import { UpdateComponent } from './update/update.component';
import { UserSeeComponent } from './user-see/user-see.component';
import { UserDoctorComponent } from './user-doctor/user-doctor.component';
import { authGuard } from '../welcome/guards/auth.guard';
const routes: Routes = [
  { path: 'delete', component: DeleteComponent,canActivate: [authGuard]  },
  { path: 'details', component: DetailsComponent,canActivate: [authGuard]  },
  { path: 'generals', component: GeneralsComponent,canActivate: [authGuard]  },
  { path: 'receptionistSee', component: ReceptionistSeeComponent,canActivate: [authGuard]  },
  { path: 'update', component: UpdateComponent,canActivate: [authGuard]  },
  { path: 'userSee', component: UserSeeComponent,canActivate: [authGuard]  },
  { path: 'userDoctor', component: UserDoctorComponent,canActivate: [authGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
