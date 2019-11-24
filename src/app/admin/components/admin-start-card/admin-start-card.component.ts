import {Component, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../../admin/services/adminWelcomeService/admin-welcome.service';
import {AuthService} from '../../../services/authService/auth.service';

@Component({
  selector: 'app-admin-start-card',
  templateUrl: './admin-start-card.component.html',
  styleUrls: ['./admin-start-card.component.scss']
})
export class AdminStartCardComponent implements OnInit {
  username = 'Nieznajomy';


  constructor(private welcomeService: AdminWelcomeService, private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
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
