import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WelcomeService} from '../../services/welcomeService/welcome.service';

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

  constructor(private welcomeService: WelcomeService) {
  }

  ngOnInit() {
    this.isGetDeviceGroupListButtonClickedSubscription = this.welcomeService.isGetDeviceGroupListButtonClicked$.subscribe(
      x => this.isGetDeviceGroupListButtonClicked = x
    );
    this.isAddDeviceGroupButtonClickedSubscription = this.welcomeService.isAddDeviceGroupButtonClicked$.subscribe(
      x => this.isAddDeviceGroupButtonClicked = x
    );
  }

  ngOnDestroy() {
    this.isGetDeviceGroupListButtonClickedSubscription.unsubscribe();
    this.isAddDeviceGroupButtonClickedSubscription.unsubscribe();
  }
}
