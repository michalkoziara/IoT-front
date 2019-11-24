import {Component, OnDestroy, OnInit} from '@angular/core';
import {WelcomeService} from '../../services/welcomeService/welcome.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  constructor(private welcomeService: WelcomeService) {
  }

  closeChildren() {
    this.welcomeService.changeIsAddDeviceGroupButtonClick(false);
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(false);
  }

}
