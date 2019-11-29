export class ExecutiveInUserGroup {
  name: string;
  state: string;
  isActive: string;
  formulaName: string;
  isFormulaUsed: string;
  deviceKey: string;

  constructor(name: string,
              state: string,
              isActive: string,
              formulaName: string,
              isFormulaUsed: string,
              deviceKey: string) {
    this.name = name;
    this.state = state;
    this.isActive = isActive;
    this.formulaName = formulaName;
    this.isFormulaUsed = isFormulaUsed;
    this.deviceKey = deviceKey;
  }
}
