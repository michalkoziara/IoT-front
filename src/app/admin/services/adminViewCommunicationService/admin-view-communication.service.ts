import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AdminViewCommunicationService {
  private currentViewSource = new BehaviorSubject(null as null | string);
  currentView$ = this.currentViewSource.asObservable();

  changeCurrentView(currentViewSource: string | null): void {
    this.currentViewSource.next(currentViewSource);
  }
}
