import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {finalize} from 'rxjs/operators';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {FormulasService} from '../../services/formulasService/formulas.service';
import {ComplexFormula, DatetimeRule, Formula} from '../../models/formula/formula';
import {CdkDragDrop, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SensorInUserGroup} from '../../models/sensor-in-user-group/sensor-in-user-group';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {SensorType} from '../../models/sensor-type/sensor-type';
import {ErrorConstantMessages} from '../../../shared/error-constant-messages';


class DropListData {
  currentData: string[];
  nextLeftData: DropListData | null;
  nextRightData: DropListData | null;


  constructor() {
    this.currentData = [];
    this.nextLeftData = null;
    this.nextRightData = null;
  }
}

class Rule {
  label: string;
  complexRule: ComplexFormula;

  constructor(label: string, complexRule: ComplexFormula) {
    this.label = label;
    this.complexRule = complexRule;
  }
}

@Component({
  selector: 'app-add-formula',
  templateUrl: './add-formula.component.html',
  styleUrls: ['./add-formula.component.scss']
})
export class AddFormulaComponent implements OnInit {
  formulaFormGroup: FormGroup;
  progressBar = false;

  isTimeRuleCreatorVisible = false;
  selectableDays: { selected: boolean; name: string }[];
  days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  timeStart: string;
  timeEnd: string;

  isLogicRuleCreatorVisible = false;
  sensors: string[] = [];
  sensorByName: Map<string, SensorInUserGroup>;
  enumerators: string[] = [];
  sensorType: SensorType | null;
  deviceKey: string | null;
  sensorValueControl = new FormControl('');

  isNegated = false;
  sensorName: string | null = null;
  comparisonSign: string | null = null;
  selectedEnumerator: string | null;
  selectedBooleanSensorValue: boolean | null;
  selectedDecimalSensorValue: number | null;

  mainOperator: string;

  basicListDataStatic = [
    'gdy oba zdania prawdziwe',
    'gdy jedno ze zdań prawdziwe',
    'gdy oba zdania nieprawdziwe',
    'gdy jedno ze zdań nieprawdziwe',
  ];
  basicListData = this.basicListDataStatic.slice();

  ruleFragmentData: DropListData | null;
  ruleFragmentListData: string[] = [];

  rules: Rule[] = [];

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  cdkDropTrackLists: CdkDropList[] = [];

  @ViewChildren(CdkDropList)
  set cdkDropLists(value: QueryList<CdkDropList>) {
    this.cdkDropTrackLists = value.toArray();
  }

  constructor(private formulasApiService: FormulasApiService,
              private formulasService: FormulasService,
              private sensorsApiService: SensorsApiService,
              private sensorTypeApiService: SensorTypeApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: ViewCommunicationService) {
    this.formulaFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      timeStartCtrl: [''],
      timeEndCtrl: [''],
    });
    this.productKey = '';
    this.userGroupName = '';

    this.selectableDays = this.days.map(
      day => ({
        name: day,
        selected: false
      })
    );
    this.timeStart = '';
    this.timeEnd = '';

    this.ruleFragmentData = null;
    this.sensorByName = new Map<string, SensorInUserGroup>();
    this.sensorType = null;
    this.deviceKey = null;

    this.selectedEnumerator = null;
    this.selectedBooleanSensorValue = false;
    this.selectedDecimalSensorValue = null;

    this.mainOperator = 'and';
  }

  ngOnInit(): void {
    this.loadSensorsInList();
  }

  dropBasic(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if ((event.container.id === 'basicList' && event.previousContainer.id === 'ruleFragmentList')
      || (event.previousContainer.id === 'basicList' && event.container.id === 'ruleFragmentList')) {

    } else {
      transferArrayItem(event.previousContainer.data,
        [],
        event.previousIndex,
        0);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.data.length > 0) {

    } else if (event.previousContainer.id === 'basicList' || event.previousContainer.id === 'ruleFragmentList') {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  createRuleFragmentData(parentDropListData: DropListData | null, side: boolean | null): DropListData {
    const newDropListData = new DropListData();

    if (parentDropListData === null) {
      if (this.ruleFragmentData === null) {
        this.ruleFragmentData = newDropListData;
      } else {
        return this.ruleFragmentData;
      }
    } else if (side !== null) {
      if (side) {
        parentDropListData.nextRightData = newDropListData;
      } else {
        parentDropListData.nextLeftData = newDropListData;
      }
    }

    return newDropListData;
  }

  toggleIsNegated(value: boolean): void {
    this.isNegated = value;
  }

  onChangeBooleanSensorValue(value: boolean): void {
    this.selectedBooleanSensorValue = value;
  }

  sensorSelectionChanged(sensorName: string): void {
    const sensor = this.sensorByName.get(sensorName);
    if (sensor) {
      this.deviceKey = sensor.deviceKey;
      this.getSensor(sensor.deviceKey);
    } else {
      this.snackBar.open('Wystąpił błąd poczas wczytywania, spróbuj ponownie', undefined, {duration: 3000});
    }
  }

  setDecimalSensorValue(): void {
    this.selectedDecimalSensorValue = this.sensorValueControl.value;
  }

  loadSensorsInList(): void {
    this.sensorsApiService.getSensors(this.productKey, this.userGroupName)
      .subscribe((data) => {
        this.sensors = data.map(sensorInUserGroup => sensorInUserGroup.name);
        for (const sensor of data) {
          this.sensorByName.set(sensor.name, sensor);
        }
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas wczytywania, spróbuj ponownie', undefined, {duration: 3000});
      }
      );
  }

  getSensor(deviceKey: string): void {
    this.sensorsApiService.getSensor(
      this.productKey,
      deviceKey
    )
      .subscribe(
        data => {
          this.getSensorType(data.sensorTypeName);
        },
        () => {
          this.snackBar.open('Wystąpił błąd poczas wczytywania, spróbuj ponownie', undefined, {duration: 3000});
        }
      );
  }

  getSensorType(typeName: string): void {
    this.sensorTypeApiService.getSensorType(
      this.productKey,
      typeName
    ).subscribe(
      data => {
        this.sensorType = data;

        this.enumerators = data.enumerator.map(
          enumerator => enumerator.text
        );
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas wczytywania, spróbuj ponownie', undefined, {duration: 3000});
      }
    );
  }

  addRule(): void {
    let ruleLabel = '';
    if (!this.isNegated) {
      ruleLabel += 'jeżeli czujnik o nazwie ';
    } else {
      ruleLabel += 'gdy nieprawdą jest, że czujnik o nazwie ';
    }

    ruleLabel += this.sensorName + ' ';
    ruleLabel += this.comparisonSign + ' ';

    let functor = null;
    if (this.comparisonSign === 'przyjmuje stan') {
      functor = '==';
    } else if (this.comparisonSign === 'nie przyjmuje stanu') {
      functor = '!=';
    } else if (this.comparisonSign === 'przyjmuje stan równy lub większy od') {
      functor = '=>';
    } else if (this.comparisonSign === 'przyjmuje stan równy lub mniejszy od') {
      functor = '<=';
    }

    let complexRule = null;
    if (this.sensorType) {
      if (this.selectedBooleanSensorValue !== null && this.sensorType.readingType === 'Boolean') {
        if (this.selectedBooleanSensorValue) {
          ruleLabel += 'alternatywny';
        } else {
          ruleLabel += 'podstawowy';
        }

        complexRule = new ComplexFormula(
          this.isNegated,
          this.selectedBooleanSensorValue,
          functor,
          this.deviceKey,
          null,
          null,
          null
        );
      } else if (this.selectedEnumerator && this.sensorType.readingType === 'Enum') {
        ruleLabel += this.selectedEnumerator;

        complexRule = new ComplexFormula(
          this.isNegated,
          this.selectedEnumerator,
          functor,
          this.deviceKey,
          null,
          null,
          null
        );
      } else if (this.selectedDecimalSensorValue !== null && this.sensorType.readingType === 'Decimal') {
        ruleLabel += this.selectedDecimalSensorValue;

        complexRule = new ComplexFormula(
          this.isNegated,
          this.selectedDecimalSensorValue,
          functor,
          this.deviceKey,
          null,
          null,
          null
        );
      }
    }

    if (ruleLabel && complexRule) {
      this.rules.push(
        new Rule(ruleLabel, complexRule)
      );

      this.ruleFragmentListData.push(ruleLabel);
    } else {
      this.snackBar.open('Wystąpił błąd poczas wczytywania, spróbuj ponownie', undefined, {duration: 3000});
    }
  }

  createFormula(): void {
    this.progressBar = true;

    if (this.formulaFormGroup != null
      && this.formulaFormGroup.get('nameCtrl') !== null) {
      const formulaName = (this.formulaFormGroup.get('nameCtrl') as AbstractControl).value;

      let datetimeRule = null;
      let sensorRule = null;

      if (this.isTimeRuleCreatorVisible) {
        const formattedDays = this.selectableDays
          .filter(day => day.selected)
          .map(day => this.days.indexOf(day.name))
          .join(',');

        const defaultDate = '2000-01-01T';
        const defaultSeconds = ':00.000000Z';

        const formattedStartDatetime = defaultDate + this.timeStart + defaultSeconds;
        const formattedEndDatetime = defaultDate + this.timeEnd + defaultSeconds;

        datetimeRule = new DatetimeRule(formattedStartDatetime, formattedEndDatetime, formattedDays);
      }

      if (this.isLogicRuleCreatorVisible && this.ruleFragmentData) {
        sensorRule = this.createSensorRule(this.rules, this.ruleFragmentData);
      }

      let operator = 'and';
      if (this.mainOperator !== null && this.isLogicRuleCreatorVisible && this.isTimeRuleCreatorVisible) {
        operator = this.mainOperator;
      }

      const rule: { sensorRule: ComplexFormula | null; datetimeRule: DatetimeRule | null; operator: string } = {
        sensorRule,
        datetimeRule,
        operator
      };

      this.formulasApiService.postFormula(
        this.productKey,
        this.userGroupName,
        new Formula(formulaName, rule)
      ).pipe(
        finalize(() => this.afterComplete())
      ).subscribe(
        () => {
          this.snackBar.open('Stworzono formułę automatycznego sterowania', undefined, {duration: 3000});
          this.viewCommunicationService.changeCurrentView('showFormula');
          this.formulasService.changeSelectedFormula(formulaName);
        },
        (errorMessage) => {
          if (errorMessage.message && errorMessage.message === ErrorConstantMessages.RESPONSE_MESSAGE_INVALID_FORMULA) {
            this.snackBar.open('Formuła jest niepoprawna, stwórz nową formułę', undefined, {duration: 5000});
          } else {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
          }
        }
      );
    }
  }

  createSensorRule(rules: Rule[], ruleFragmentData: DropListData): ComplexFormula | null {
    if (ruleFragmentData.currentData.length > 0) {
      for (const rule of rules) {
        if (rule.label === ruleFragmentData.currentData[0]) {
          return new ComplexFormula(
            rule.complexRule.isNegated,
            rule.complexRule.value,
            rule.complexRule.functor,
            rule.complexRule.deviceKey,
            null,
            null,
            null
          );
        }
      }

      if (this.basicListDataStatic.includes(ruleFragmentData.currentData[0])) {
        let complexLeft = null;
        let complexRight = null;
        if (ruleFragmentData.nextLeftData !== null) {
          complexLeft = this.createSensorRule(rules, ruleFragmentData.nextLeftData);
        }
        if (ruleFragmentData.nextRightData !== null) {
          complexRight = this.createSensorRule(rules, ruleFragmentData.nextRightData);
        }

        let isNegated;
        let operator;
        if (ruleFragmentData.currentData[0] === 'gdy oba zdania prawdziwe') {
          isNegated = false;
          operator = 'and';
        }
        if (ruleFragmentData.currentData[0] === 'gdy jedno ze zdań prawdziwe') {
          isNegated = false;
          operator = 'or';
        }
        if (ruleFragmentData.currentData[0] === 'gdy oba zdania nieprawdziwe') {
          isNegated = true;
          operator = 'and';
        }
        if (ruleFragmentData.currentData[0] === 'gdy jedno ze zdań nieprawdziwe') {
          isNegated = true;
          operator = 'or';
        }

        if (isNegated !== undefined && operator !== undefined) {
          return new ComplexFormula(
            isNegated,
            null,
            null,
            null,
            complexLeft,
            operator,
            complexRight
          );
        } else {
          return null;
        }
      }
    }

    return null;
  }

  validateCreateButton(): boolean {
    const selectedDays = this.selectableDays.filter(day => day.selected).length;

    return !this.formulaFormGroup.valid
      || (this.isTimeRuleCreatorVisible && ((this.timeEnd === '' && this.timeStart === '') || selectedDays === 0));
  }

  afterComplete(): void {
    this.progressBar = false;
  }

  changeTimeRule(): void {
    this.isTimeRuleCreatorVisible = !this.isTimeRuleCreatorVisible;
  }

  changeLogicRule(): void {
    this.isLogicRuleCreatorVisible = !this.isLogicRuleCreatorVisible;
  }

  populateTimeStart(timeStart: string): void {
    this.timeStart = timeStart;
  }

  populateTimeEnd(timeEnd: string): void {
    this.timeEnd = timeEnd;
  }
}
