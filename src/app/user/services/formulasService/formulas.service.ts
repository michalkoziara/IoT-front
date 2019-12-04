import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class FormulasService {
  private selectedFormulaSource = new BehaviorSubject(null as string | null);
  selectedFormula$ = this.selectedFormulaSource.asObservable();

  changeSelectedFormula(selectedFormulaSource: string | null): void {
    this.selectedFormulaSource.next(selectedFormulaSource);
  }
}
