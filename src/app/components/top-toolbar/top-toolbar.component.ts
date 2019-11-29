import {Component} from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {AuthInfo} from '../../services/authService/auth-info';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent {
  currentAuthInfo: AuthInfo | null;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.currentAuthInfo = null;
    this.authenticationService.currentAuthInfo.subscribe(x => this.currentAuthInfo = x);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
