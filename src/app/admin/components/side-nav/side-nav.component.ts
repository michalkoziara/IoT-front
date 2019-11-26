import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {Subscription} from 'rxjs';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  currentView: string;
  currentViewSubscription: Subscription;


  constructor(private welcomeService: AdminWelcomeService,
              private viewCommunicationService: AdminViewCommunicationService) {
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

  getUserGroupList() {
    this.closeChildren();
    this.viewCommunicationService.changeCurrentView('userGroupList');
  }
}
