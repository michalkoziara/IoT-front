import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-admin-inner-toolbar',
  templateUrl: './admin-inner-toolbar.component.html',
  styleUrls: ['./admin-inner-toolbar.component.scss']
})
export class AdminInnerToolbarComponent implements OnInit, OnDestroy {

  currentView: string | null;
  currentViewSubscription: Subscription;

  constructor(private viewCommunicationService: AdminViewCommunicationService) {
    this.currentView = null;
    this.currentViewSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentViewSubscription = this.viewCommunicationService.currentView$.subscribe(
      x => {
        this.currentView = x;
      }
    );
  }

  ngOnDestroy(): void {
    this.currentViewSubscription.unsubscribe();
  }

}
