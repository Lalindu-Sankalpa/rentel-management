import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { NewReservationComponent } from './reservation/new-reservation/new-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CameraComponent } from './cameratype/camera/camera.component';
import { CameratypeComponent } from './cameratype/cameratype.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LenseComponent } from './lense/lense.component';
import { AccManagerComponent } from './acc-manager/acc-manager.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'guest', component:GuestComponent},
  {path:'reservation', component:ReservationComponent},
  {path:'camera', component:CameraComponent},
  {path:'cameratype', component:CameratypeComponent},
  {path: 'newreservation', component:NewReservationComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'lense', component:LenseComponent},
  {path: 'acc', component:AccManagerComponent},
  {path: 'report', component:ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
