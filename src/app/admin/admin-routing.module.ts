import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'dashboard', component: AdminComponent}
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
