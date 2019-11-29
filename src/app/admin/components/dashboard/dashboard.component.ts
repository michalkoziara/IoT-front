import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';
import {SensorService} from '../../services/sensorService/sensor.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  productKey: string;
  deviceGroupName: string;
  productKeyApiSubscription: Subscription;

  selectedSensor: string | null;
  selectedSensorSubscription: Subscription;


  currentView: string | null;
  currentViewSubscription: Subscription;

  constructor(private viewCommunicationService: AdminViewCommunicationService,
              private welcomeService: AdminWelcomeService,
              private productKeyApiService: ProductKeyApiService,
              private sensorsService: SensorService) {
    this.productKeyApiSubscription = new Subscription();

    this.productKey = '';
    this.deviceGroupName = '';

    this.selectedSensor = null;
    this.selectedSensorSubscription = new Subscription();

    this.currentView = '';
    this.currentViewSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );

    this.productKeyApiSubscription = this.productKeyApiService.getDeviceGroup().subscribe(x => {
      if (x != null) {
        this.productKey = x[0].productKey;
        this.deviceGroupName = x[0].name;
      }
    });

    this.selectedSensorSubscription = this.sensorsService.selectedSensor$.subscribe(
      x => this.selectedSensor = x
    );
  }

  ngOnDestroy(): void {
    this.productKeyApiSubscription.unsubscribe();
    this.currentViewSubscription.unsubscribe();
  }
}
