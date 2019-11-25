import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  currentView: string;
  currentViewSubscription: Subscription;

  constructor(private viewCommunicationService: ViewCommunicationService) {
  }

  ngOnInit() {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => this.currentView = x
    );
  }

  ngOnDestroy() {
    this.currentViewSubscription.unsubscribe();
  }

  closeChildren() {
    this.viewCommunicationService.changeCurrentView(null);
  }

  getDeviceGroupList() {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('deviceGroupList');
  }
}
