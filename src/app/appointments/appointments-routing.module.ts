import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeeComponent } from './see/see.component';
import { GenerateComponent } from './generate/generate.component';
import { SeedoctorComponent } from './seedoctor/seedoctor.component';
import { SeereceptionistComponent } from './seereceptionist/seereceptionist.component';
import { authGuard } from '../welcome/guards/auth.guard';
const routes: Routes = [
  { path: 'see', component: SeeComponent,canActivate: [authGuard]  },
  { path: 'seedoctor', component: SeedoctorComponent,canActivate: [authGuard] },
  { path: 'seereceptionist', component: SeereceptionistComponent,canActivate: [authGuard]  },
  { path: 'generate', component: GenerateComponent,canActivate: [authGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
