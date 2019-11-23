import {Component, OnInit} from '@angular/core';
import {WelcomeService} from '../../services/welcome.service';
import {AuthService} from '../../../services/authService/auth.service';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent implements OnInit {
  username = 'Nieznajomy';

  constructor(private welcomeService: WelcomeService, private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.authenticationService.currentAuthInfo.subscribe(x => {
      if (x != null) {
        this.username = x.username;
      }
    });
  }

  getDeviceGroupList() {
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(true);
  }

  addNewDeviceGroup() {
    this.welcomeService.changeIsAddDeviceGroupButtonClick(true);
  }
}
