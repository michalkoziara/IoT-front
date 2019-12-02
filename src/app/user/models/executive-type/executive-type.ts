export class ExecutiveType {
  name: string;
  stateType: string;
  stateRangeMin: number;
  stateRangeMax: number;
  enumerator: { number: number; text: string }[];
  defaultState: number;

  constructor(
    name: string,
    stateType: string,
    stateRangeMin: number,
    stateRangeMax: number,
    enumerator: { number: number; text: string }[],
    defaultState: number) {
    this.name = name;
    this.stateType = stateType;
    this.stateRangeMin = stateRangeMin;
    this.stateRangeMax = stateRangeMax;
    this.enumerator = enumerator;
    this.defaultState = defaultState;
  }
}
