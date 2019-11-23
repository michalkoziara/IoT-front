import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: 'dashboard', component: AdminComponent},
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

export const routingComponents = [
  AdminComponent,
  SideNavComponent,
  DashboardComponent
];
