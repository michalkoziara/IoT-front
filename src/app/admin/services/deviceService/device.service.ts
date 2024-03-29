import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DeviceService {

  private selectedExecutiveSource = new BehaviorSubject(null as string | null);
  selectedExecutive$ = this.selectedExecutiveSource.asObservable();

  private selectedExecutiveNameSource = new BehaviorSubject(null as string | null);
  selectedExecutiveName$ = this.selectedExecutiveNameSource.asObservable();

  changeSelectedExecutive(selectedExecutiveSource: string): void {
    this.selectedExecutiveSource.next(selectedExecutiveSource);
  }

  changeSelectedExecutiveName(selectedExecutiveNameSource: string): void {
    this.selectedExecutiveNameSource.next(selectedExecutiveNameSource);
  }
}
