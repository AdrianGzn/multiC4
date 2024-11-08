import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeeComponent } from './see/see.component';
import { GenerateComponent } from './generate/generate.component';

const routes: Routes = [
  { path: 'see', component: SeeComponent },
  { path: 'generate', component: GenerateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
