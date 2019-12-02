export class ExecutiveInUserGroup {
  name: string;
  state: string | boolean | number;
  isActive: string | boolean;
  formulaName: string;
  isFormulaUsed: string | boolean;
  deviceKey: string;

  constructor(
    name: string,
    state: string | boolean | number,
    isActive: string | boolean,
    formulaName: string,
    isFormulaUsed: string | boolean,
    deviceKey: string) {
    this.name = name;
    this.state = state;
    this.isActive = isActive;
    this.formulaName = formulaName;
    this.isFormulaUsed = isFormulaUsed;
    this.deviceKey = deviceKey;
  }
}
