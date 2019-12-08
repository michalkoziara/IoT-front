import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';
import {SensorService} from '../../services/sensorService/sensor.service';
import {DeviceService} from '../../services/deviceService/device.service';


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

  selectedDevice: string | null;
  selectedDeviceSubscription: Subscription;

  currentView: string | null;
  currentViewSubscription: Subscription;

  constructor(private viewCommunicationService: AdminViewCommunicationService,
              private productKeyApiService: ProductKeyApiService,
              private sensorsService: SensorService,
              private deviceService: DeviceService) {
    this.productKeyApiSubscription = new Subscription();

    this.productKey = '';
    this.deviceGroupName = '';

    this.selectedSensor = null;
    this.selectedSensorSubscription = new Subscription();

    this.selectedDevice = null;
    this.selectedDeviceSubscription = new Subscription();

    this.currentView = '';
    this.currentViewSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );

    this.productKeyApiSubscription = this.productKeyApiService.getDeviceGroup().subscribe(data => {
      if (data.length > 0) {
        this.productKey = data[0].productKey;
        this.deviceGroupName = data[0].name;
      }
    });

    this.selectedSensorSubscription = this.sensorsService.selectedSensor$.subscribe(
      x => this.selectedSensor = x
    );

    this.selectedDeviceSubscription = this.deviceService.selectedExecutive$.subscribe(
      x => this.selectedDevice = x
    );
  }

  ngOnDestroy(): void {
    this.productKeyApiSubscription.unsubscribe();
    this.currentViewSubscription.unsubscribe();
    this.selectedSensorSubscription.unsubscribe();
    this.selectedDeviceSubscription.unsubscribe();
  }
}
