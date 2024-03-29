import {Component} from '@angular/core';
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
export class RegisterComponent {
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
    this.returnUrl = '';
  }

  onRegister(): void {
    this.submitted = true;

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid || this.usernameFormControl.invalid) {
      return;
    }

    this.loading = true;
    this.registerService.register(
      new UserRegistrationRequest(
        this.usernameFormControl.value,
        this.emailFormControl.value,
        this.passwordFormControl.value)
    ).subscribe(
      () => {
        this.snackBar.open('Rejestracja zakończona pomyślnie', undefined, {duration: 2000});
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
        this.loading = false;

        let snackMessage = '';
        if (error === 'CONFLICT') {
          snackMessage = 'Istnieje już użytkownik o podanych danych';
        } else if (error === 'BAD REQUEST') {
          snackMessage = 'Podano błędne dane';
        } else if (error === 'UNAUTHORIZED') {
          snackMessage = 'Błędne hasło urządzenia głównego';
        }

        this.snackBar.open(snackMessage, undefined, {duration: 2000});
      }
    );
  }
}

