import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routingComponents, UserRoutingModule} from './user-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    UserRoutingModule,
  ],
  providers: [],
})
export class UserModule {
}
