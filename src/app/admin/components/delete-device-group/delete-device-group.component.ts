import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-delete-device-group',
  templateUrl: './delete-device-group.component.html',
  styleUrls: ['./delete-device-group.component.scss']
})
export class DeleteDeviceGroupComponent {
  error = '';
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  @Input()
  productKey: string;

  @Input()
  deviceGroupName: string;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private productKeyApiService: ProductKeyApiService) {
    this.productKey = '';
    this.deviceGroupName = '';
  }

  onChangeName(): void {
    if (this.nameFormControl.invalid) {
      return;
    }


    this.productKeyApiService.changeDeviceGroupName(this.productKey, this.nameFormControl.value).pipe(first()).subscribe(
      data => {
        if (data !== null) {
          this.deviceGroupName = data.changedName;
          console.log(this.deviceGroupName);
        }
      },
      error => {
        this.error = error;

        this.snackBar.open('Wystąpił błąd poczas zmiany nazwy, spróbuj ponownie', undefined, {duration: 2000});
      }
    );


  }

}
