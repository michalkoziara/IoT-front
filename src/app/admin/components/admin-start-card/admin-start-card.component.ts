import {Component, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../../admin/services/adminWelcomeService/admin-welcome.service';
import {AuthService} from '../../../services/authService/auth.service';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';

@Component({
  selector: 'app-admin-start-card',
  templateUrl: './admin-start-card.component.html',
  styleUrls: ['./admin-start-card.component.scss']
})
export class AdminStartCardComponent implements OnInit {
  username = 'Nieznajomy';
  productKey: string;
  deviceGroupName: string;

  constructor(private welcomeService: AdminWelcomeService, private authenticationService: AuthService,
              private productKeyApiService: ProductKeyApiService) {
  }

  ngOnInit() {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
      }
    });

    this.productKeyApiService.getDeviceGroup().subscribe(x => {
      if (x != null) {
        this.productKey = x[0].productKey;
        this.deviceGroupName = x[0].name;
      }
    });


  }

  getUserGroupList() {
    this.welcomeService.changeIsGetUsersGroupsListButtonClicked(true);
  }

  getDeviceList() {
    this.welcomeService.changeIsGetDeviceListButtonClicked(true);
  }

  getSensorList() {
    this.welcomeService.changeIsGetSensorsListButtonClickedSource(true);
  }

  getUnconfiguredList() {
    this.welcomeService.changeIsGetUnconfigureListButtonClicked(true);
  }

  getDeviceTypeList() {
    this.welcomeService.changeIsGetDevicesTypesListButtonClicked(true);
  }

  getSensorTypeList() {
    this.welcomeService.changeIsGetSensorTypesListButtonClicked(true);
  }


}
