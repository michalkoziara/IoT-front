import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ChangeNameDialogComponent} from '../change-name-dialog/change-name-dialog.component';

@Component({
  selector: 'app-change-device-group-name',
  templateUrl: './change-device-group-name.component.html',
  styleUrls: ['./change-device-group-name.component.scss']
})
export class ChangeDeviceGroupNameComponent implements OnInit {

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
              private productKeyApiService: ProductKeyApiService,
              public dialog: MatDialog) {
    this.productKey = '';
    this.deviceGroupName = '';
  }

  ngOnInit(): void {
  }


  onChangeName(): void {
    if (this.nameFormControl.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ChangeNameDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
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


    });
  }


}
