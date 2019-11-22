import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminRegisterRequest} from '../../services/adminRegistration/admin-register-request';
import {AdminRegisterService} from '../../services/adminRegistration/admin-register.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  deviceKeyFormControl = new FormControl('', [
    Validators.required,
  ]);

  devicePasswordFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private registerService: AdminRegisterService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.submitted = true;

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid || this.usernameFormControl.invalid ||
      this.deviceKeyFormControl.invalid || this.devicePasswordFormControl.invalid) {
      return;
    }

    this.loading = true;
    this.registerService.register(new AdminRegisterRequest(this.usernameFormControl.value, this.emailFormControl.value,
      this.passwordFormControl.value, this.deviceKeyFormControl.value, this.devicePasswordFormControl.value)).subscribe(
      response => {
        console.log(response)
        if (response.status === 201) {
          this.snackBar.open('Rejestracja zakończona pomyślnie', null, {duration: 2000});
          this.router.navigate(['/login']);
        } else {

          console.log('response error ' + response.errorMessage);
        }
      },
      error => {

        this.error = JSON.stringify(error)
        console.log(this.error)
        this.error = error;
        this.loading = false;
        console.log('response error ' + error.errorMessage);
        this.snackBar.open('Wystąpił błąd poczas rejestracji, spróbuj ponownie', null, {duration: 2000});

      }
    );

  }
}
