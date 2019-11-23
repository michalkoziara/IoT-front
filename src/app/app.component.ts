import {Component} from '@angular/core';
import {AuthInfo} from './services/authService/auth-info';
import {AuthService} from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentAuthInfo: AuthInfo;

  constructor(
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentAuthInfo.subscribe(x => this.currentAuthInfo = x);
  }
}
