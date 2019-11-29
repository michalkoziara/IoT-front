import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  currentView: string | null;
  currentViewSubscription: Subscription;

  constructor(private viewCommunicationService: ViewCommunicationService) {
    this.currentView = null;
    this.currentViewSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => this.currentView = x
    );
  }

  ngOnDestroy(): void {
    this.currentViewSubscription.unsubscribe();
  }

  closeChildren(): void {
    this.viewCommunicationService.changeCurrentView(null);
  }

  getDeviceGroupList(): void {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('deviceGroupList');
  }
}
