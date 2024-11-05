import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'establishment', loadChildren: () => import('./establishment/establishment.module').then(m => m.EstablishmentModule) },
  { path: 'campaigns', loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule) },
  { path: 'appointments', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule) },
  { path: 'schedules', loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesModule) },
  { path: '', loadChildren: () => import('./user-log/user-log.module').then(m => m.UserLogModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
