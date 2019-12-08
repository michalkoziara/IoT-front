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
import {AdminInnerToolbarComponent} from './components/admin-inner-toolbar/admin-inner-toolbar.component';
import {FlexModule} from '@angular/flex-layout';
import {UserGroupComponent} from './components/user-group/user-group.component';
import {AdminViewCommunicationService} from './services/adminViewCommunicationService/admin-view-communication.service';
import {UnconfiguredDevicesComponent} from './components/unconfigured-devices/unconfigured-devices.component';
import {DevicesComponent} from './components/devices/devices.component';
import {SensorsComponent} from './components/sensors/sensors.component';
import {ExecutiveTypeComponent} from './components/executive-type/executive-type.component';
import {SensorTypeComponent} from './components/sensor-type/sensor-type.component';
import {ChangeDeviceGroupNameComponent} from './components/change-device-group-name/change-device-group-name.component';
import {SensorDetailsComponent} from './components/sensor-details/sensor-details.component';
import {SensorService} from './services/sensorService/sensor.service';
import {UserGroupService} from './services/userGroupService/user-group.service';
import {DeviceDetailsComponent} from './components/device-details/device-details.component';
import {DeviceService} from './services/deviceService/device.service';
import {AddSensorComponent} from './components/add-sensor/add-sensor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddExecutiveComponent} from './components/add-executive/add-executive.component';
import {ChangeNameDialogComponent} from './components/change-name-dialog/change-name-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteUserGroupDialogComponent} from './components/delete-user-group-dialog/delete-user-group-dialog.component';
import {DeleteSensorDialogComponent} from './components/delete-sensor-dialog/delete-sensor-dialog.component';
import {DeleteDeviceDialogComponent} from './components/delete-device-dialog/delete-device-dialog.component';
import {DeviceApiService} from './services/apiService/device-api.service';
import {ProductKeyApiService} from './services/apiService/product-key-api.service';
import {SensorApiService} from './services/apiService/sensor-api.service';
import {SensorTypeApiService} from './services/apiService/sensor-type-api.service';
import {UnconfiguredApiService} from './services/apiService/unconfigured-api.service';
import {UserGroupApiService} from './services/apiService/user-group-api.service';
import {ExecutiveTypeApiService} from './services/apiService/executive-type-api.service';
import {AddExecutiveTypeComponent} from './components/add-executive-type/add-executive-type.component';
import {CustomPaginator} from '../shared/custom-paginator-conf';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { AddSensorTypeComponent } from './components/add-sensor-type/add-sensor-type.component';
import {FormulaApiService} from './services/apiService/formula-api.service';


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
    SensorTypeComponent,
    ChangeDeviceGroupNameComponent,
    SensorDetailsComponent,
    DeviceDetailsComponent,
    AddSensorComponent,
    AddExecutiveComponent,
    ChangeNameDialogComponent,
    DeleteUserGroupDialogComponent,
    DeleteSensorDialogComponent,
    DeleteDeviceDialogComponent,
    AddExecutiveTypeComponent,
    AddSensorTypeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FlexModule,
    MatDialogModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AdminViewCommunicationService,
    SensorService,
    UserGroupService,
    DeviceService,
    DeviceApiService,
    ProductKeyApiService,
    SensorApiService,
    SensorTypeApiService,
    ExecutiveTypeApiService,
    UnconfiguredApiService,
    UserGroupApiService,
    FormulaApiService,
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}
  ],
  entryComponents: [
    ChangeNameDialogComponent,
    DeleteUserGroupDialogComponent,
    DeleteDeviceDialogComponent,
    DeleteSensorDialogComponent
  ]
})
export class AdminModule {
}
