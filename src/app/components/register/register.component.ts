import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRegistrationRequest} from '../../services/userRegistration/user-registration-request';
import {UserRegistrationService} from '../../services/userRegistration/user-registration.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private registerService: UserRegistrationService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.submitted = true;

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid || this.usernameFormControl.invalid) {
      return;
    }

    this.loading = true;
    this.registerService.register(new UserRegistrationRequest(this.usernameFormControl.value, this.emailFormControl.value,
      this.passwordFormControl.value)).subscribe(
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

