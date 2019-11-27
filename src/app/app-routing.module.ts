import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AdminRegistrationComponent} from './components/admin-registration/admin-registration.component';
import {AdminGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin-register', component: AdminRegistrationComponent},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AdminGuard]},
  {path: 'user', loadChildren: './user/user.module#UserModule', canLoad: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  AdminRegistrationComponent
];
