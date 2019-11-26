import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AdminViewCommunicationService {
  private currentViewSource = new BehaviorSubject(null);
  currentView$ = this.currentViewSource.asObservable();

  changeCurrentView(currentViewSource: string) {
    this.currentViewSource.next(currentViewSource);
  }
}
