export class DeviceDetails {
  name: string;
  state: boolean | string | number;
  isUpdated: boolean | string;
  isActive: boolean | string;
  isAssigned: boolean;
  positiveState: boolean | string | number | null;
  negativeState: boolean | string | number | null;
  deviceKey: string;
  deviceTypeName: string;
  deviceUserGroup: string | null;
  isFormulaUsed: boolean | string;
  formulaName: string | null;
  defaultState: boolean | string | number;

  constructor(
    name: string,
    state: boolean | string | number,
    isUpdated: boolean | string,
    isActive: boolean | string,
    isAssigned: boolean,
    positiveState: boolean | string | number | null,
    negativeState: boolean | string | number | null,
    deviceKey: string,
    deviceTypeName: string,
    deviceUserGroup: string | null,
    isFormulaUsed: boolean | string,
    formulaName: string | null,
    defaultState: boolean | string | number ) {
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
