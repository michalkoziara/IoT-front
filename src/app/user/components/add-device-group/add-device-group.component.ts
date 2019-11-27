import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';

@Component({
  selector: 'app-add-device-group',
  templateUrl: './add-device-group.component.html',
  styleUrls: ['./add-device-group.component.scss']
})
export class AddDeviceGroupComponent implements OnInit {
  deviceKeyFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  progressBar = false;

  constructor(private deviceGroupsApiService: DeviceGroupsApiService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.deviceKeyFormGroup = this.formBuilder.group({
      deviceKeyCtrl: ['', Validators.required]
    });
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.required]
    });
  }

  addDeviceGroup() {
    this.progressBar = true;
    this.deviceGroupsApiService.addDeviceGroup(
      {
        productKey: this.deviceKeyFormGroup.get('deviceKeyCtrl').value,
        productPassword: this.passwordFormGroup.get('passwordCtrl').value
      }
    );
  }
}
