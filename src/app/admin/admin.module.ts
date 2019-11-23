import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule, routingComponents} from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [routingComponents, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [],
})
export class AdminModule { }
