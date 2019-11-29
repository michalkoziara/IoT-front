import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ViewCommunicationService {
  private currentViewSource = new BehaviorSubject(null as string | null);
  currentView$ = this.currentViewSource.asObservable();

  changeCurrentView(currentViewSource: string | null): void {
    this.currentViewSource.next(currentViewSource);
  }
}
