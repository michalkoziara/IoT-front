import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule, routingComponents} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {AngularMaterialModule} from '../angular-material.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminStartCardComponent} from './components/admin-start-card/admin-start-card.component';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../services/authService/auth.interceptor';
import {ErrorInterceptor} from '../services/authService/error.interceptor';
import {AdminWelcomeService} from './services/adminWelcomeService/admin-welcome.service';
import {AdminInnerToolbarComponent} from './components/admin-inner-toolbar/admin-inner-toolbar.component';
import {FlexModule} from '@angular/flex-layout';
import {UserGroupComponent} from './components/user-group/user-group.component';
import {AdminViewCommunicationService} from './services/admin-view-communication.service';
import {UnconfiguredDevicesComponent} from './components/unconfigured-devices/unconfigured-devices.component';
import {DevicesComponent} from './components/devices/devices.component';
import {SensorsComponent} from './components/sensors/sensors.component';
import {ExecutiveTypeComponent} from './components/executive-type/executive-type.component';
import {SensorTypeComponent} from './components/sensor-type/sensor-type.component';
import { DeleteDeviceGroupComponent } from './components/delete-device-group/delete-device-group.component';
import { ChangeDeviceGroupNameComponent } from './components/change-device-group-name/change-device-group-name.component';
import { SensorDetailsComponent } from './components/sensor-details/sensor-details.component';
import {SensorService} from './services/sensorService/sensor.service';
import {UserGroupService} from './services/user-group.service';

@NgModule({
  declarations: [
    routingComponents,
    AdminComponent,
    SideNavComponent,
    DashboardComponent,
    AdminStartCardComponent,
    AdminInnerToolbarComponent,
    UserGroupComponent,
    UnconfiguredDevicesComponent,
    DevicesComponent,
    SensorsComponent,
    ExecutiveTypeComponent,
    SensorTypeComponent, DeleteDeviceGroupComponent, ChangeDeviceGroupNameComponent, SensorDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FlexModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AdminWelcomeService,
    AdminViewCommunicationService,
    SensorService,
    UserGroupService,

  ],
})
export class AdminModule {
}
