import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';
import {MatSnackBar} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {ErrorConstantMessages} from '../../../shared/error-constant-messages';

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
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
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
    ).pipe(
      finalize(() => this.afterComplete())
    ).subscribe(
      data => {
        this.snackBar.open('Dodano urządzenie główne', null, {duration: 2000});
      },
      error => {
        switch (error.message) {
          case ErrorConstantMessages.RESPONSE_MESSAGE_PRODUCT_KEY_NOT_FOUND: {
            this.snackBar.open('Urządzenie o podanym kluczu produktu nie istnieje', null, {duration: 2000});
            break;
          }
          case ErrorConstantMessages.RESPONSE_MESSAGE_WRONG_PASSWORD: {
            this.snackBar.open('Podano nieprawidłowe hasło urządzenia głównego', null, {duration: 2000});
            break;
          }
          case ErrorConstantMessages.RESPONSE_MESSAGE_USER_ALREADY_IN_DEVICE_GROUP: {
            this.snackBar.open('Podana grupa urządzeń jest już na liście dostępnych grup', null, {duration: 2000});
            break;
          }
          default: {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', null, {duration: 2000});
            break;
          }
        }
      }
    );
  }

  afterComplete() {
    this.progressBar = false;
  }
}
