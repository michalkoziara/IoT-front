import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';
import {MatSnackBar} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {ErrorConstantMessages} from '../../../shared/error-constant-messages';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-add-device-group',
  templateUrl: './add-device-group.component.html',
  styleUrls: ['./add-device-group.component.scss']
})
export class AddDeviceGroupComponent {
  deviceKeyFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  progressBar = false;
  selectedProductKey: string;

  constructor(private deviceGroupsApiService: DeviceGroupsApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: ViewCommunicationService) {
    this.deviceKeyFormGroup = this.formBuilder.group({
      deviceKeyCtrl: ['', Validators.required]
    });
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.required]
    });
    this.selectedProductKey = '';
  }

  addDeviceGroup(): void {
    this.progressBar = true;

    let productKey = '';
    let productPassword = '';
    if (this.deviceKeyFormGroup.get('deviceKeyCtrl') !== null
      && this.passwordFormGroup.get('passwordCtrl') !== null) {
      productKey = (this.deviceKeyFormGroup.get('deviceKeyCtrl') as AbstractControl).value;
      productPassword = (this.passwordFormGroup.get('passwordCtrl') as AbstractControl).value;
    }

    this.deviceGroupsApiService.addDeviceGroup(
      {productKey, productPassword}
    ).pipe(
      finalize(() => this.afterComplete())
    ).subscribe(
      () => {
        this.snackBar.open('Dodano urządzenie główne', undefined, {duration: 3000});
        this.viewCommunicationService.changeCurrentView('deviceGroupList');
      },
      error => {
        switch (error.message) {
          case ErrorConstantMessages.RESPONSE_MESSAGE_PRODUCT_KEY_NOT_FOUND: {
            this.snackBar.open('Urządzenie o podanym kluczu produktu nie istnieje', undefined, {duration: 3000});
            break;
          }
          case ErrorConstantMessages.RESPONSE_MESSAGE_WRONG_PASSWORD: {
            this.snackBar.open('Podano nieprawidłowe hasło urządzenia głównego', undefined, {duration: 3000});
            break;
          }
          case ErrorConstantMessages.RESPONSE_MESSAGE_USER_ALREADY_IN_DEVICE_GROUP: {
            this.snackBar.open('Podana grupa urządzeń jest już na liście dostępnych grup', undefined, {duration: 3000});
            break;
          }
          default: {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
            break;
          }
        }
      }
    );
  }

  afterComplete(): void {
    this.progressBar = false;
  }

  populateProductKey(productKey: string): void {
    this.selectedProductKey = productKey;
  }
}
