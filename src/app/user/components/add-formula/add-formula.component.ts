import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {finalize} from 'rxjs/operators';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {FormulasService} from '../../services/formulasService/formulas.service';
import {ComplexFormula, DatetimeRule, Formula} from '../../models/formula/formula';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-formula',
  templateUrl: './add-formula.component.html',
  styleUrls: ['./add-formula.component.scss']
})
export class AddFormulaComponent {
  formulaFormGroup: FormGroup;
  progressBar = false;

  isTimeRuleCreatorVisible = false;
  selectableDays: { selected: boolean; name: string }[];
  days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  timeStart: string;
  timeEnd: string;

  isLogicRuleCreatorVisible = false;

  basicListDataStatic = [
    'lub',
    'i',
    'nie i',
    'nie lub',
  ];
  basicListData = this.basicListDataStatic.slice();

  ruleFragmentListData = ['Tutaj kawałek formuły 1', 'Tutaj Kawałek 2'];
  ruleListData = [];

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  constructor(private formulasApiService: FormulasApiService,
              private formulasService: FormulasService,
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
    } else if (event.container.data.length > 1) {

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

  createFormula(): void {
    this.progressBar = true;

    if (this.formulaFormGroup != null
      && this.formulaFormGroup.get('nameCtrl') !== null) {
      const formulaName = (this.formulaFormGroup.get('nameCtrl') as AbstractControl).value;

      let datetimeRule = null;
      const sensorRule = null;

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

      const rule: { sensorRule: ComplexFormula | null; datetimeRule: DatetimeRule | null; operator: string } = {
        sensorRule,
        datetimeRule,
        operator: 'and'
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
        () => {
          this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
        }
      );
    }
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

