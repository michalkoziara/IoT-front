import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private authenticationService: AuthService,
              private router: Router) {
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const currentAuthInfo = this.authenticationService.currentAuthInfoValue;
    if (currentAuthInfo && currentAuthInfo.isAdmin) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
