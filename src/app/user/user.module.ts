import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {routingComponents, UserRoutingModule} from './user-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {SharedModule} from '../shared/shared.module';
import {InnerToolbarComponent} from './components/inner-toolbar/inner-toolbar.component';
import {DeviceGroupsCardComponent} from './components/device-groups-card/device-groups-card.component';
import {StartCardComponent} from './components/start-card/start-card.component';
import {WelcomeService} from './services/welcome.service';

@NgModule({
  declarations: [
    routingComponents,
    SideNavComponent,
    InnerToolbarComponent,
    DeviceGroupsCardComponent,
    StartCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FlexLayoutModule,
    UserRoutingModule,
  ],
  providers: [
    WelcomeService
  ],
})
export class UserModule {
}
