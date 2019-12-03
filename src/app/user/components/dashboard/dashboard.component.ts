import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {SensorsService} from '../../services/sensorsService/sensors.service';
import {ExecutivesService} from '../../services/executivesService/executives.service';
import {FormulasService} from '../../services/formulasService/formulas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
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
  selectedExecutive: string | null;
  selectedExecutiveSubscription: Subscription;
  selectedFormula: string | null;
  selectedFormulaSubscription: Subscription;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private deviceGroupsService: DeviceGroupsService,
              private userGroupsService: UserGroupsService,
              private sensorsService: SensorsService,
              private executivesService: ExecutivesService,
              private formulasService: FormulasService) {
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
    this.selectedExecutive = null;
    this.selectedExecutiveSubscription = new Subscription();
    this.selectedFormula = null;
    this.selectedFormulaSubscription = new Subscription();
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
    this.selectedExecutiveSubscription = this.executivesService.selectedExecutive$.subscribe(
      x => this.selectedExecutive = x
    );
    this.selectedFormulaSubscription = this.formulasService.selectedFormula$.subscribe(
      x => this.selectedFormula = x
    );
  }

  ngOnDestroy(): void {
    this.currentViewSubscription.unsubscribe();

    this.selectedDeviceGroupSubscription.unsubscribe();
    this.selectedUserGroupSubscription.unsubscribe();
    this.selectedJoiningUserGroupSubscription.unsubscribe();
    this.selectedSensorSubscription.unsubscribe();
    this.selectedExecutiveSubscription.unsubscribe();
    this.selectedFormulaSubscription.unsubscribe();
  }
}
