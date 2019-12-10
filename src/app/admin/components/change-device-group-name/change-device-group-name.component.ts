import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProductKeyApiService} from '../../services/apiService/product-key-api.service';
import {finalize, first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ChangeNameDialogComponent} from '../change-name-dialog/change-name-dialog.component';

@Component({
  selector: 'app-change-device-group-name',
  templateUrl: './change-device-group-name.component.html',
  styleUrls: ['./change-device-group-name.component.scss']
})
export class ChangeDeviceGroupNameComponent implements OnInit {
  nameFormGroup: FormGroup;
  progressBar = false;

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
    this.nameFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.nameFormGroup.patchValue({nameCtrl: this.deviceGroupName});
    this.nameFormGroup.controls.nameCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  onChangeName(): void {
    if (this.nameFormGroup.get('nameCtrl') !== null) {
      const name = (this.nameFormGroup.get('nameCtrl') as AbstractControl).value;

      const dialogRef = this.dialog.open(ChangeNameDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.progressBar = true;

        if (result === true) {
          this.productKeyApiService.changeDeviceGroupName(this.productKey, name).pipe(
            first(),
            finalize(() => this.afterComplete())
          ).subscribe(
            data => {
              this.deviceGroupName = data.name;
              this.snackBar.open(`Nazwa została zmieniona na ${data.name}`, undefined, {duration: 3000});
            },
            () => {
              this.snackBar.open('Wystąpił błąd poczas zmiany nazwy, spróbuj ponownie', undefined, {duration: 3000});
            }
          );
        } else {
          this.afterComplete();
        }
      });
    }
  }

  afterComplete(): void {
    this.progressBar = false;
  }
}
