import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {finalize} from 'rxjs/operators';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {FormulasService} from '../../services/formulasService/formulas.service';
import {ComplexFormula} from '../../models/formula/formula';

@Component({
  selector: 'app-add-formula',
  templateUrl: './add-formula.component.html',
  styleUrls: ['./add-formula.component.scss']
})
export class AddFormulaComponent implements OnInit {
  formulaFormGroup: FormGroup | null;
  progressBar = false;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  constructor(private formulasApiService: FormulasApiService,
              private formulasService: FormulasService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: ViewCommunicationService) {
    this.formulaFormGroup = null;
    this.productKey = '';
    this.userGroupName = '';
  }

  ngOnInit(): void {
    this.formulaFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      ruleCtrl: ['', Validators.required]
    });
  }

  createFormula(): void {
    this.progressBar = true;

    if (this.formulaFormGroup != null
      && this.formulaFormGroup.get('nameCtrl') !== null
      && this.formulaFormGroup.get('ruleCtrl') !== null) {
      const formulaName = (this.formulaFormGroup.get('nameCtrl') as AbstractControl).value;
      const ruleString = (this.formulaFormGroup.get('ruleCtrl') as AbstractControl).value;

      const rule: ComplexFormula = JSON.parse(ruleString);

      this.formulasApiService.postFormula(
        this.productKey,
        this.userGroupName,
        {formulaName, rule}
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

  afterComplete(): void {
    this.progressBar = false;
  }
}

