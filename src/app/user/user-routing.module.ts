import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import {UserComponent} from './user.component';
import {SideNavComponent} from './side-nav/side-nav.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'dashboard', component: UserComponent},
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
  UserComponent,
  SideNavComponent,
  DashboardComponent,
];
