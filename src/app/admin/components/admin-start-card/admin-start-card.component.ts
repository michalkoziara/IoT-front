import {Component, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
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

  ngOnInit(): void {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
      }
    }
    );
  }


  getUserGroupList(): void {
    this.viewCommunicationService.changeCurrentView('userGroupList');
  }

  getDeviceList(): void {
    this.viewCommunicationService.changeCurrentView('devicesList');
  }

  getSensorList(): void {
    this.viewCommunicationService.changeCurrentView('sensorsList');
  }

  getUnconfiguredList(): void {
    this.viewCommunicationService.changeCurrentView('unconfiguredList');
  }

  getDeviceTypeList(): void {
    this.viewCommunicationService.changeCurrentView('executiveTypesList');
  }

  getSensorTypeList(): void {
    this.viewCommunicationService.changeCurrentView('sensorTypesList');
  }


}
