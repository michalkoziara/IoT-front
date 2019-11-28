import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  productKey: string;
  deviceGroupName: string;
  productKeyApiSubscription: Subscription;


  currentView: string;
  currentViewSubscription: Subscription;

  isGetUsersGroupsListButtonClicked: boolean;
  isGetUsersGroupsListButtonClickedSubscription: Subscription;

  isGetSensorsListButtonClicked: boolean;
  isGetSensorsListButtonClickedSubscription: Subscription;

  isGetDeviceListButtonClicked: boolean;
  isGetDeviceListButtonClickedSubscription: Subscription;

  isGetUnconfiguredListButtonClicked: boolean;
  isGetUnconfiguredListButtonClickedSubscription: Subscription;

  isGetSensorTypesListButtonClicked: boolean;
  isGetSensorTypesListButtonClickedSubscription: Subscription;

  isGetDevicesTypesListButtonClicked: boolean;
  isGetDevicesTypesListButtonClickedSubscription: Subscription;

  constructor(private viewCommunicationService: AdminViewCommunicationService,
              private welcomeService: AdminWelcomeService,
              private productKeyApiService: ProductKeyApiService) {
  }

  ngOnInit() {

    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );

    this.productKeyApiSubscription = this.productKeyApiService.getDeviceGroup().subscribe(x => {
      if (x != null) {
        this.productKey = x[0].productKey;
        this.deviceGroupName = x[0].name;
      }
    });

    this.isGetUsersGroupsListButtonClickedSubscription = this.welcomeService.isGetUsersGroupsListButtonClicked$.subscribe(
      x => this.isGetUsersGroupsListButtonClicked = x
    );
    this.isGetSensorsListButtonClickedSubscription = this.welcomeService.isGetSensorsListButtonClicked$.subscribe(
      x => this.isGetSensorsListButtonClicked = x
    );
    this.isGetDeviceListButtonClickedSubscription = this.welcomeService.isGetDeviceListButtonClicked$.subscribe(
      x => this.isGetDeviceListButtonClicked = x
    );
    this.isGetUnconfiguredListButtonClickedSubscription = this.welcomeService.isGetUnconfiguredListButtonClicked$.subscribe(
      x => this.isGetUnconfiguredListButtonClicked = x
    );
    this.isGetSensorTypesListButtonClickedSubscription = this.welcomeService.isGetSensorTypesListButtonClicked$.subscribe(
      x => this.isGetSensorTypesListButtonClicked = x
    );
    this.isGetDevicesTypesListButtonClickedSubscription = this.welcomeService.isGetDevicesTypesListButtonClicked$.subscribe(
      x => this.isGetDevicesTypesListButtonClicked = x
    );

  }

  ngOnDestroy() {
    this.productKeyApiSubscription.unsubscribe();
    this.currentViewSubscription.unsubscribe();


    this.isGetUsersGroupsListButtonClickedSubscription.unsubscribe();
    this.isGetSensorsListButtonClickedSubscription.unsubscribe();
    this.isGetDeviceListButtonClickedSubscription.unsubscribe();
    this.isGetUnconfiguredListButtonClickedSubscription.unsubscribe();
    this.isGetSensorTypesListButtonClickedSubscription.unsubscribe();
    this.isGetDevicesTypesListButtonClickedSubscription.unsubscribe();
  }
}