import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {Subscription} from 'rxjs';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  currentView: string | null;
  currentViewSubscription: Subscription;

  constructor(private welcomeService: AdminWelcomeService,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.currentView = null;
    this.currentViewSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => this.currentView = x
    );
  }

  ngOnDestroy(): void {
    this.currentViewSubscription.unsubscribe();
  }

  closeChildren(): void {
    this.viewCommunicationService.changeCurrentView(null);
  }

  getUserGroupList(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('userGroupList');
  }

  getUnconfiguredList(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('unconfiguredList');
  }

  getDevices(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('devicesList');
  }

  getSensors(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('sensorsList');
  }

  getDevicesTypes(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('executiveTypesList');
  }

  getSensorTypes(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('sensorTypesList');
  }

  changeDeviceGroupName(){
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('changeDeviceGroupName');
  }

  deleteDeviceGroup(){
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('deleteDeviceGroup');
  }

}
