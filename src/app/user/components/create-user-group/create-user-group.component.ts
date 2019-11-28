import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {ErrorConstantMessages} from '../../../shared/error-constant-messages';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-create-user-group',
  templateUrl: './create-user-group.component.html',
  styleUrls: ['./create-user-group.component.scss']
})
export class CreateUserGroupComponent implements OnInit {
  groupNameFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  progressBar = false;

  @Input()
  productKey: string;

  constructor(private userGroupsApiService: UserGroupsApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: ViewCommunicationService) {
  }

  ngOnInit() {
    this.groupNameFormGroup = this.formBuilder.group({
      groupNameCtrl: ['', [Validators.required, Validators.pattern(/^(?!.*[$\\].*).*$/)]]
    });
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createUserGroup() {
    this.progressBar = true;
    this.userGroupsApiService.createUserGroup(
      this.productKey,
      {
        groupName: this.groupNameFormGroup.get('groupNameCtrl').value,
        password: this.passwordFormGroup.get('passwordCtrl').value
      }
    ).pipe(
      finalize(() => this.afterComplete())
    ).subscribe(
      data => {
        this.snackBar.open('Dodano nową grupę użytkowników', null, {duration: 3000});
        this.viewCommunicationService.changeCurrentView('joiningUserGroupsInDevice');
      },
      error => {
        switch (error.message) {
          case ErrorConstantMessages.RESPONSE_MESSAGE_USER_GROUP_ALREADY_EXISTS: {
            this.snackBar.open('Podana grupa użytkowników już istnieje', null, {duration: 3000});
            break;
          }
          default: {
            this.snackBar.open('Wystąpił błąd poczas tworzenia, spróbuj ponownie', null, {duration: 3000});
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
