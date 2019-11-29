import {Component, Input, OnInit} from '@angular/core';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {Executive} from '../../models/executive/executive';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss']
})
export class ExecutiveComponent implements OnInit {
  executive: Executive | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private executiveApiService: ExecutivesApiService) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
  }

  ngOnInit(): void {
    this.getSensor();
  }

  getSensor(): void {
    this.executiveApiService.getExecutive(
      this.productKey,
      this.deviceKey
    ).subscribe(
      data => {
        if (data.state === true) {
          data.state = 'Podstawowy';
        }

        if (data.state === false) {
          data.state = 'Alternatywny';
        }

        if (data.isUpdated === true) {
          data.isUpdated = 'Tak';
        }

        if (data.isUpdated === false) {
          data.isUpdated = 'Nie';
        }

        if (data.isActive === true) {
          data.isActive = 'Tak';
        }

        if (data.isActive === false) {
          data.isActive = 'Nie';
        }

        if (data.positiveState === true) {
          data.positiveState = 'Tak';
        }

        if (data.positiveState === false) {
          data.positiveState = 'Nie';
        }

        if (data.negativeState === true) {
          data.negativeState = 'Tak';
        }

        if (data.negativeState === false) {
          data.negativeState = 'Nie';
        }

        if (data.isFormulaUsed === true) {
          data.isFormulaUsed = 'Tak';
        }

        if (data.isFormulaUsed === false) {
          data.isFormulaUsed = 'Nie';
        }

        if (data.defaultState === true) {
          data.defaultState = 'Tak';
        }

        if (data.defaultState === false) {
          data.defaultState = 'Nie';
        }

        this.executive = data;
      }
    );
  }
}
