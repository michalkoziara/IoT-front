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
import {WelcomeService} from './services/welcomeService/welcome.service';
import {DeviceGroupsApiService} from './services/apiService/device-groups-api.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../services/authService/auth.interceptor';
import {ErrorInterceptor} from '../services/authService/error.interceptor';
import {CustomPaginator} from '../shared/custom-paginator-conf';
import {MatPaginatorIntl} from '@angular/material';
import {UserGroupsComponent} from './components/user-groups/user-groups.component';
import {UserGroupsApiService} from './services/apiService/user-groups-api.service';
import {DeviceGroupsService} from './services/deviceGroupsService/device-groups.service';

@NgModule({
  declarations: [
    routingComponents,
    SideNavComponent,
    InnerToolbarComponent,
    DeviceGroupsCardComponent,
    StartCardComponent,
    UserGroupsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FlexLayoutModule,
    UserRoutingModule,
  ],
  providers: [
    WelcomeService,
    DeviceGroupsService,
    DeviceGroupsApiService,
    UserGroupsApiService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}
  ],
})
export class UserModule {
}
