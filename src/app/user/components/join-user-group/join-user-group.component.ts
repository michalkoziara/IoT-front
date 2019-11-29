import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {MatSnackBar} from '@angular/material';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {ErrorConstantMessages} from '../../../shared/error-constant-messages';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-join-user-group',
  templateUrl: './join-user-group.component.html',
  styleUrls: ['./join-user-group.component.scss']
})
export class JoinUserGroupComponent implements OnInit {
  passwordFormGroup: FormGroup | null;
  progressBar = false;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  constructor(private userGroupsApiService: UserGroupsApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: ViewCommunicationService) {
    this.passwordFormGroup = null;
    this.productKey = '';
    this.userGroupName = '';
  }

  ngOnInit(): void {
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.required]
    });
  }

  joinUserGroup(): void {
    this.progressBar = true;

    let password = '';
    if (this.passwordFormGroup != null
      && this.passwordFormGroup.get('passwordCtrl') !== null) {
      password = (this.passwordFormGroup.get('passwordCtrl') as AbstractControl).value;
    }

    this.userGroupsApiService.joinUserGroup(
      this.productKey,
      this.userGroupName,
      {password}
    ).pipe(
      finalize(() => this.afterComplete())
    ).subscribe(
      () => {
        this.snackBar.open('Dołączono do grupy użytkowników', undefined, {duration: 3000});
        this.viewCommunicationService.changeCurrentView('userGroupAssignedToList');
      },
      error => {
        switch (error.message) {
          case ErrorConstantMessages.RESPONSE_MESSAGE_WRONG_PASSWORD: {
            this.snackBar.open('Podano niepoprawne hasło grupy użytkowników', undefined, {duration: 3000});
            break;
          }
          case ErrorConstantMessages.RESPONSE_MESSAGE_USER_ALREADY_IN_USER_GROUP: {
            this.snackBar.open('Podana grupa użytkowników jest już na liście dostępnych grup', undefined, {duration: 3000});
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
}
