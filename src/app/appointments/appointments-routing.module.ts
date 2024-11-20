import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeeComponent } from './see/see.component';
import { GenerateComponent } from './generate/generate.component';
import { SeedoctorComponent } from './seedoctor/seedoctor.component';
import { SeereceptionistComponent } from './seereceptionist/seereceptionist.component';
import { authGuard } from '../shared/guards/auth.guard';
const routes: Routes = [
  { path: 'see', component: SeeComponent},
  { path: 'seedoctor', component: SeedoctorComponent},
  { path: 'seereceptionist', component: SeereceptionistComponent},
  { path: 'generate', component: GenerateComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
