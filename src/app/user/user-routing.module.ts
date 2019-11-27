import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserComponent} from './user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'dashboard', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routingComponents = [
  UserComponent,
  DashboardComponent,
];
