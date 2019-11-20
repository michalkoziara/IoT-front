import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule, routingComponents} from './admin-routing.module';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [],
})
export class AdminModule { }
