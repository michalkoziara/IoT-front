import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';
import {DeviceApiService} from '../../services/apiService/device-api.service';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.component.html',
  styleUrls: ['./add-executive.component.scss']
})
export class AddExecutiveComponent implements OnInit {
  executiveFormGroup: FormGroup;
  progressBar = false;
  executivesTypes: string[] = [];
  selectedTypeName: string | null;

  @Input()
  productKey: string;

  constructor(private executiveTypeApiService: ExecutiveTypeApiService,
              private deviceApiService: DeviceApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.executiveFormGroup = this.formBuilder.group({
      deviceKeyCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required]
    });
    this.productKey = '';
    this.selectedTypeName = null;
  }

  ngOnInit(): void {
    this.loadExecutivesTypesList();
  }

  loadExecutivesTypesList(): Subscription {
    return this.executiveTypeApiService.getExecutiveTypes(this.productKey).subscribe((data) => {
      this.executivesTypes = data;
    },
    () => {
      this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
    });
  }

  createExecutive(): void {
    if (this.executiveFormGroup.get('nameCtrl') !== null
      && this.executiveFormGroup.get('passwordCtrl') !== null
      && this.executiveFormGroup.get('deviceKeyCtrl') !== null) {
      this.progressBar = true;

      const name = (this.executiveFormGroup.get('nameCtrl') as AbstractControl).value;
      const password = (this.executiveFormGroup.get('passwordCtrl') as AbstractControl).value;
      const deviceKey = (this.executiveFormGroup.get('deviceKeyCtrl') as AbstractControl).value;

      this.deviceApiService.postExecutive(
        this.productKey,
        {
          deviceKey,
          password,
          deviceName: name,
          deviceTypeName: this.selectedTypeName as string
        }
      ).pipe(
        finalize(() => this.afterComplete())
      ).subscribe(
        () => {
          this.snackBar.open('Dodano nowe urządzenie', undefined, {duration: 3000});
          this.viewCommunicationService.changeCurrentView('devicesList');
        },
        () => {
          this.snackBar.open('Wystąpił błąd poczas tworzenia, spróbuj ponownie', undefined, {duration: 3000});
        }
      );
    }
  }

  afterComplete(): void {
    this.progressBar = false;
  }
}
