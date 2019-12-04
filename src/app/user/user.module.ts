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
import {DeviceGroupsApiService} from './services/apiService/device-groups-api.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../services/authService/auth.interceptor';
import {ErrorInterceptor} from '../services/authService/error.interceptor';
import {CustomPaginator} from '../shared/custom-paginator-conf';
import {MatPaginatorIntl} from '@angular/material';
import {UserGroupsComponent} from './components/user-groups/user-groups.component';
import {UserGroupsApiService} from './services/apiService/user-groups-api.service';
import {DeviceGroupsService} from './services/deviceGroupsService/device-groups.service';
import {SensorsComponent} from './components/sensors/sensors.component';
import {SensorsApiService} from './services/apiService/sensors-api.service';
import {UserGroupsService} from './services/userGroupsService/user-groups.service';
import {ViewCommunicationService} from './services/viewCommunicationService/view-communication.service';
import {ExecutivesComponent} from './components/executives/executives.component';
import {ExecutivesApiService} from './services/apiService/executives-api.service';
import {FormulasComponent} from './components/formulas/formulas.component';
import {FormulasApiService} from './services/apiService/formulas-api.service';
import {UserGroupsInDeviceComponent} from './components/user-groups-in-device/user-groups-in-device.component';
import {UnassignedExecutivesComponent} from './components/unassigned-executives/unassigned-executives.component';
import {UnassignedSensorsComponent} from './components/unassigned-sensors/unassigned-sensors.component';
import {AddDeviceGroupComponent} from './components/add-device-group/add-device-group.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateUserGroupComponent} from './components/create-user-group/create-user-group.component';
import {JoinUserGroupComponent} from './components/join-user-group/join-user-group.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {SensorsService} from './services/sensorsService/sensors.service';
import {ExecutivesService} from './services/executivesService/executives.service';
import {ExecutiveComponent} from './components/executive/executive.component';
import {ExecutiveTypesApiService} from './services/apiService/executive-types-api.service';
import {ChartsModule} from 'ng2-charts';
import 'moment/locale/pl';
import {FormulaComponent} from './components/formula/formula.component';
import {FormulasService} from './services/formulasService/formulas.service';
import {AddFormulaComponent} from './components/add-formula/add-formula.component';

@NgModule({
  declarations: [
    routingComponents,
    SideNavComponent,
    InnerToolbarComponent,
    DeviceGroupsCardComponent,
    StartCardComponent,
    UserGroupsComponent,
    SensorsComponent,
    ExecutivesComponent,
    FormulasComponent,
    UserGroupsInDeviceComponent,
    UnassignedExecutivesComponent,
    UnassignedSensorsComponent,
    AddDeviceGroupComponent,
    CreateUserGroupComponent,
    JoinUserGroupComponent,
    SensorComponent,
    ExecutiveComponent,
    FormulaComponent,
    AddFormulaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FlexLayoutModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    ViewCommunicationService,
    DeviceGroupsApiService,
    DeviceGroupsService,
    UserGroupsApiService,
    UserGroupsService,
    SensorsApiService,
    SensorsService,
    ExecutivesApiService,
    ExecutiveTypesApiService,
    ExecutivesService,
    FormulasApiService,
    FormulasService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}
  ],
})
export class UserModule {
}
