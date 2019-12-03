import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ExecutivesService {
  private selectedExecutiveSource = new BehaviorSubject(null as string | null);
  selectedExecutive$ = this.selectedExecutiveSource.asObservable();

  private selectedExecutiveNameSource = new BehaviorSubject(null as string | null);
  selectedExecutiveName$ = this.selectedExecutiveNameSource.asObservable();

  changeSelectedExecutive(selectedExecutiveSource: string | null): void {
    this.selectedExecutiveSource.next(selectedExecutiveSource);
  }

  changeSelectedExecutiveName(selectedExecutiveNameSource: string | null): void {
    this.selectedExecutiveNameSource.next(selectedExecutiveNameSource);
  }
}
