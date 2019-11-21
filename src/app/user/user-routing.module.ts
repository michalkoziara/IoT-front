import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'user', component: DashboardComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routingComponents = [
  DashboardComponent
];
