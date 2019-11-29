import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {first} from 'rxjs/operators';
import {AuthRequest} from '../../services/authService/auth-request';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private snackBar: MatSnackBar
  ) {
    if (this.authenticationService.currentAuthInfo) {
      this.router.navigate(['/']);
    }
    this.returnUrl = '';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onLogIn(): void {
    this.submitted = true;

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(new AuthRequest(this.emailFormControl.value, this.passwordFormControl.value))
      .pipe(first())
      .subscribe(
        data => {
          if (data !== null) {
            if (data.isAdmin) {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/user/dashboard']);
            }
          }
        },
        error => {
          this.error = error;
          this.loading = false;

          this.snackBar.open('Wystąpił błąd poczas logowania, spróbuj ponownie', undefined, {duration: 2000});
        });
  }
}
