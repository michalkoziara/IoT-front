export class Executive {
  name: string;
  state: boolean | string;
  isUpdated: boolean | string;
  isActive: boolean | string;
  isAssigned: boolean;
  positiveState: boolean | string;
  negativeState: boolean | string;
  deviceKey: string;
  deviceTypeName: string;
  deviceUserGroup: string;
  isFormulaUsed: boolean | string;
  formulaName: string;
  defaultState: boolean | string;

  constructor(
    name: string,
    state: boolean | string,
    isUpdated: boolean | string,
    isActive: boolean | string,
    isAssigned: boolean,
    positiveState: boolean | string,
    negativeState: boolean | string,
    deviceKey: string,
    deviceTypeName: string,
    deviceUserGroup: string,
    isFormulaUsed: boolean | string,
    formulaName: string,
    defaultState: boolean | string) {
    this.name = name;
    this.state = state;
    this.isUpdated = isUpdated;
    this.isActive = isActive;
    this.isAssigned = isAssigned;
    this.positiveState = positiveState;
    this.negativeState = negativeState;
    this.deviceKey = deviceKey;
    this.deviceTypeName = deviceTypeName;
    this.deviceUserGroup = deviceUserGroup;
    this.isFormulaUsed = isFormulaUsed;
    this.formulaName = formulaName;
    this.defaultState = defaultState;
  }
}
