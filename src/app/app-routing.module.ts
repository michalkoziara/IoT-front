import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {AdministrationPanelComponent} from './components/administration-panel/administration-panel.component';
import {AdminRegistrationComponent} from './components/admin-registration/admin-registration.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin-register', component: AdminRegistrationComponent},
  {path: 'administration-panel', component: AdministrationPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [LogInComponent, RegisterComponent, AdminRegistrationComponent, AdministrationPanelComponent];
