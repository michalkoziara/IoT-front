import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule, routingComponents} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {AngularMaterialModule} from '../angular-material.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminStartCardComponent} from './components/admin-start-card/admin-start-card.component';
import {SharedModule} from "../shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../services/authService/auth.interceptor";
import {ErrorInterceptor} from "../services/authService/error.interceptor";
import {AdminWelcomeService} from "./services/adminWelcomeService/admin-welcome.service";
import {AdminInnerToolbarComponent} from './components/admin-inner-toolbar/admin-inner-toolbar.component';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [routingComponents, AdminComponent, SideNavComponent, DashboardComponent, AdminStartCardComponent, AdminInnerToolbarComponent],
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
    AdminWelcomeService
  ],
})
export class AdminModule {
}
