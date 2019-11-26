import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-admin-inner-toolbar',
  templateUrl: './admin-inner-toolbar.component.html',
  styleUrls: ['./admin-inner-toolbar.component.scss']
})
export class AdminInnerToolbarComponent implements OnInit, OnDestroy {

  currentView: string;
  currentViewSubscription: Subscription;


  constructor(private viewCommunicationService: AdminViewCommunicationService) {
  }

  ngOnInit() {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );
  }

  ngOnDestroy() {
    this.currentViewSubscription.unsubscribe();
  }

}
