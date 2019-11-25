import {Component} from '@angular/core';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(private welcomeService: AdminWelcomeService) {
  }

  closeChildren() {
    this.welcomeService.changeIsGetUsersGroupsListButtonClicked(false);
    this.welcomeService.changeIsGetSensorsListButtonClickedSource(false);
    this.welcomeService.changeIsGetDeviceListButtonClicked(false);
    this.welcomeService.changeIsGetUnconfigureListButtonClicked(false);
    this.welcomeService.changeIsGetSensorTypesListButtonClicked(false);
    this.welcomeService.changeIsGetDevicesTypesListButtonClicked(false);
  }
}
