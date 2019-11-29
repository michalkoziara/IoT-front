import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {SensorsService} from '../../services/sensorsService/sensors.service';
import {ExecutivesService} from '../../services/executivesService/executives.service';

@Component({
  selector: 'app-inner-toolbar',
  templateUrl: './inner-toolbar.component.html',
  styleUrls: ['./inner-toolbar.component.scss']
})
export class InnerToolbarComponent implements OnInit, OnDestroy {
  currentView: string | null;
  currentViewSubscription: Subscription;

  selectedDeviceGroup: string | null;
  selectedDeviceGroupSubscription: Subscription;
  selectedUserGroup: string | null;
  selectedUserGroupSubscription: Subscription;
  selectedJoiningUserGroup: string | null;
  selectedJoiningUserGroupSubscription: Subscription;
  selectedSensor: string | null;
  selectedSensorSubscription: Subscription;
  selectedSensorName: string | null;
  selectedSensorNameSubscription: Subscription;
  selectedExecutive: string | null;
  selectedExecutiveSubscription: Subscription;
  selectedExecutiveName: string | null;
  selectedExecutiveNameSubscription: Subscription;


  constructor(private viewCommunicationService: ViewCommunicationService,
              private deviceGroupsService: DeviceGroupsService,
              private userGroupsService: UserGroupsService,
              private sensorsService: SensorsService,
              private executivesService: ExecutivesService) {
    this.currentView = null;
    this.currentViewSubscription = new Subscription();
    this.selectedDeviceGroup = null;
    this.selectedDeviceGroupSubscription = new Subscription();
    this.selectedUserGroup = null;
    this.selectedUserGroupSubscription = new Subscription();
    this.selectedJoiningUserGroup = null;
    this.selectedJoiningUserGroupSubscription = new Subscription();
    this.selectedSensor = null;
    this.selectedSensorSubscription = new Subscription();
    this.selectedSensorName = null;
    this.selectedSensorNameSubscription = new Subscription();
    this.selectedExecutive = null;
    this.selectedExecutiveSubscription = new Subscription();
    this.selectedExecutiveName = null;
    this.selectedExecutiveNameSubscription = new Subscription();
  }

  ngOnInit(): void {
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
    this.selectedJoiningUserGroupSubscription = this.userGroupsService.selectedJoiningUserGroup$.subscribe(
      x => this.selectedJoiningUserGroup = x
    );
    this.selectedSensorSubscription = this.sensorsService.selectedSensor$.subscribe(
      x => this.selectedSensor = x
    );
    this.selectedSensorNameSubscription = this.sensorsService.selectedSensorName$.subscribe(
      x => this.selectedSensorName = x
    );
    this.selectedExecutiveSubscription = this.executivesService.selectedExecutive$.subscribe(
      x => this.selectedExecutive = x
    );
    this.selectedExecutiveNameSubscription = this.executivesService.selectedExecutiveName$.subscribe(
      x => this.selectedExecutiveName = x
    );
  }

  ngOnDestroy(): void {
    this.currentViewSubscription.unsubscribe();

    this.selectedDeviceGroupSubscription.unsubscribe();
    this.selectedUserGroupSubscription.unsubscribe();
    this.selectedJoiningUserGroupSubscription.unsubscribe();
    this.selectedSensorSubscription.unsubscribe();
    this.selectedSensorNameSubscription.unsubscribe();
    this.selectedExecutiveSubscription.unsubscribe();
    this.selectedExecutiveNameSubscription.unsubscribe();
  }
}
