import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule, routingComponents} from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {AngularMaterialModule} from '../angular-material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [routingComponents, AdminComponent, SideNavComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
  ],
  providers: [],
})
export class AdminModule { }
