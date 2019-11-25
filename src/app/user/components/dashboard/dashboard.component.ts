import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WelcomeService} from '../../services/welcomeService/welcome.service';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isGetDeviceGroupListButtonClicked: boolean;
  isGetDeviceGroupListButtonClickedSubscription: Subscription;
  isAddDeviceGroupButtonClicked: boolean;
  isAddDeviceGroupButtonClickedSubscription: Subscription;

  selectedDeviceGroup: string;
  selectedDeviceGroupSubscription: Subscription;

  selectedUserGroup: string;
  selectedUserGroupSubscription: Subscription;
  selectedExecutivesInUserGroup: boolean;
  selectedExecutivesInUserGroupSubscription: Subscription;
  selectedSensorsInUserGroup: boolean;
  selectedSensorsInUserGroupSubscription: Subscription;
  selectedFormulasInUserGroup: boolean;
  selectedFormulasInUserGroupSubscription: Subscription;

  constructor(private welcomeService: WelcomeService,
              private deviceGroupsService: DeviceGroupsService,
              private userGroupsService: UserGroupsService) {
  }

  ngOnInit() {
    this.isGetDeviceGroupListButtonClickedSubscription = this.welcomeService.isGetDeviceGroupListButtonClicked$.subscribe(
      x => this.isGetDeviceGroupListButtonClicked = x
    );
    this.isAddDeviceGroupButtonClickedSubscription = this.welcomeService.isAddDeviceGroupButtonClicked$.subscribe(
      x => this.isAddDeviceGroupButtonClicked = x
    );
    this.selectedDeviceGroupSubscription = this.deviceGroupsService.selectedDeviceGroup$.subscribe(
      x => this.selectedDeviceGroup = x
    );
    this.selectedUserGroupSubscription = this.userGroupsService.selectedUserGroup$.subscribe(
      x => this.selectedUserGroup = x
    );
    this.selectedSensorsInUserGroupSubscription = this.userGroupsService.selectedSensorsInUserGroup$.subscribe(
      x => this.selectedSensorsInUserGroup = x
    );
    this.selectedExecutivesInUserGroupSubscription = this.userGroupsService.selectedExecutivesInUserGroup$.subscribe(
      x => this.selectedExecutivesInUserGroup = x
    );
    this.selectedFormulasInUserGroupSubscription = this.userGroupsService.selectedFormulasInUserGroup$.subscribe(
      x => this.selectedFormulasInUserGroup = x
    );
  }

  ngOnDestroy() {
    this.isGetDeviceGroupListButtonClickedSubscription.unsubscribe();
    this.isAddDeviceGroupButtonClickedSubscription.unsubscribe();
    this.selectedDeviceGroupSubscription.unsubscribe();
    this.selectedUserGroupSubscription.unsubscribe();
    this.selectedSensorsInUserGroupSubscription.unsubscribe();
    this.selectedExecutivesInUserGroupSubscription.unsubscribe();
    this.selectedFormulasInUserGroupSubscription.unsubscribe();
  }
}
