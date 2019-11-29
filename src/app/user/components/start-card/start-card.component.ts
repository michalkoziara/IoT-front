import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authService/auth.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent implements OnInit {
  username = 'Nieznajomy';

  constructor(private viewCommunicationService: ViewCommunicationService,
              private authenticationService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
      }
    });
  }

  getDeviceGroupList(): void {
    this.viewCommunicationService.changeCurrentView('deviceGroupList');
  }

  addNewDeviceGroup(): void {
    this.viewCommunicationService.changeCurrentView('addNewDeviceGroup');
  }
}
