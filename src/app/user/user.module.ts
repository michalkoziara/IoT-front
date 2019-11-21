import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routingComponents, UserRoutingModule} from './user-routing.module';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  providers: [],
})
export class UserModule {
}
