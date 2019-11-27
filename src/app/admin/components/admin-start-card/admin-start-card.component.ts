import {Component, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../../admin/services/adminWelcomeService/admin-welcome.service';
import {AuthService} from '../../../services/authService/auth.service';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-admin-start-card',
  templateUrl: './admin-start-card.component.html',
  styleUrls: ['./admin-start-card.component.scss']
})
export class AdminStartCardComponent implements OnInit {
  username = 'Nieznajomy';

  constructor(private viewCommunicationService: AdminViewCommunicationService,
              private welcomeService: AdminWelcomeService,
              private authenticationService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
      }
    });


  }


  getUserGroupList() {
    this.viewCommunicationService.changeCurrentView('userGroupList');
  }

  getDeviceList() {
    this.viewCommunicationService.changeCurrentView('devicesList');
  }

  getSensorList() {
    this.viewCommunicationService.changeCurrentView('sensorsList');
  }

  getUnconfiguredList() {
    this.viewCommunicationService.changeCurrentView('unconfiguredList');
  }

  getDeviceTypeList() {
    this.welcomeService.changeIsGetDevicesTypesListButtonClicked(true);
  }

  getSensorTypeList() {
    this.welcomeService.changeIsGetSensorTypesListButtonClicked(true);
  }


}
