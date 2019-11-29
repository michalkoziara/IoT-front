import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ExecutivesService {
  private selectedExecutiveSource = new BehaviorSubject(null);
  selectedExecutive$ = this.selectedExecutiveSource.asObservable();

  private selectedExecutiveNameSource = new BehaviorSubject(null);
  selectedExecutiveName$ = this.selectedExecutiveNameSource.asObservable();

  changeSelectedExecutive(selectedExecutiveSource: string) {
    this.selectedExecutiveSource.next(selectedExecutiveSource);
  }

  changeSelectedExecutiveName(selectedExecutiveNameSource: string) {
    this.selectedExecutiveNameSource.next(selectedExecutiveNameSource);
  }
}
