import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentView: string;
  currentViewSubscription: Subscription;

  selectedDeviceGroup: string;
  selectedDeviceGroupSubscription: Subscription;
  selectedUserGroup: string;
  selectedUserGroupSubscription: Subscription;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private deviceGroupsService: DeviceGroupsService,
              private userGroupsService: UserGroupsService) {
  }

  ngOnInit() {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );

    this.selectedDeviceGroupSubscription = this.deviceGroupsService.selectedDeviceGroup$.subscribe(
      x => this.selectedDeviceGroup = x
    );
    this.selectedUserGroupSubscription = this.userGroupsService.selectedUserGroup$.subscribe(
      x => this.selectedUserGroup = x
    );
  }

  ngOnDestroy() {
    this.currentViewSubscription.unsubscribe();

    this.selectedDeviceGroupSubscription.unsubscribe();
    this.selectedUserGroupSubscription.unsubscribe();
  }
}
