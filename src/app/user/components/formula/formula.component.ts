import {Component, Input, OnInit} from '@angular/core';
import {Formula} from '../../models/formula/formula';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit {
  formula: Formula | null;
  sensorNamesByDeviceKey: Map<string, string>;
  formulaDisplay = 'showTextDisplay';
  activeDays: string[] = [];

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @Input()
  formulaName: string;

  constructor(private formulasApiService: FormulasApiService,
              private sensorsApiService: SensorsApiService,
              private snackBar: MatSnackBar) {
    this.productKey = '';
    this.userGroupName = '';
    this.formulaName = '';
    this.formula = null;
    this.sensorNamesByDeviceKey = new Map<string, string>();
  }

  ngOnInit(): void {
    this.getFormula();
  }

  getFormula(): void {
    this.formulasApiService.getFormula(
      this.productKey,
      this.userGroupName,
      this.formulaName
    ).subscribe(
      data => {
        this.formula = data;

        if (data.rule.datetimeRule) {
          this.activeDays = data.rule.datetimeRule.days
            .split(',')
            .map(dayNumber => {
              if (dayNumber === '0') {
                return 'Poniedziałek';
              } else if (dayNumber === '1') {
                return 'Wtorek';
              } else if (dayNumber === '2') {
                return 'Środa';
              } else if (dayNumber === '3') {
                return 'Czwartek';
              } else if (dayNumber === '4') {
                return 'Piątek';
              } else if (dayNumber === '5') {
                return 'Sobota';
              } else {
                return 'Niedziela';
              }
            }
            );
        }

        this.sensorsApiService.getSensors(this.productKey, this.userGroupName).subscribe(
          sensorsData => {
            for (const sensor of sensorsData) {
              this.sensorNamesByDeviceKey.set(sensor.deviceKey, sensor.name);
            }
          },
          () => {
            this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
          }
        );
      },
      () => {
        this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
      }
    );
  }
}
