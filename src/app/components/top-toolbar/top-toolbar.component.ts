import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {AuthInfo} from '../../services/authService/auth-info';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  currentAuthInfo: AuthInfo;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentAuthInfo.subscribe(x => this.currentAuthInfo = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
