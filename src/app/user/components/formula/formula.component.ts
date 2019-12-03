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
