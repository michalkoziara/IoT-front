import {Component, OnDestroy, OnInit} from '@angular/core';
import {WelcomeService} from '../../services/welcomeService/welcome.service';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  selectedDeviceGroup: string;
  selectedDeviceGroupSubscription: Subscription;

  constructor(private welcomeService: WelcomeService,
              private deviceGroupsService: DeviceGroupsService) {
  }

  ngOnInit() {
    this.selectedDeviceGroupSubscription = this.deviceGroupsService.selectedDeviceGroup$.subscribe(
      x => this.selectedDeviceGroup = x
    );
  }

  ngOnDestroy() {
    this.selectedDeviceGroupSubscription.unsubscribe();
  }

  closeChildren() {
    this.welcomeService.changeIsAddDeviceGroupButtonClick(false);
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(false);
    this.deviceGroupsService.changeSelectedDeviceGroup(null);
  }

  getDeviceGroupList() {
    this.closeChildren();
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(true);
  }
}
