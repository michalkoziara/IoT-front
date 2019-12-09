export class Formula {
  name: string;
  rule: {
    sensorRule: ComplexFormula;
    datetimeRule: DatetimeRule;
    operator: string;
  };

  constructor(name: string, rule: { sensorRule: ComplexFormula; datetimeRule: DatetimeRule; operator: string }) {
    this.name = name;
    this.rule = rule;
  }
}

export class DatetimeRule {
  datetimeStart: string;
  datetimeEnd: string;
  days: string;

  constructor(datetimeStart: string, datetimeEnd: string, days: string) {
    this.datetimeStart = datetimeStart;
    this.datetimeEnd = datetimeEnd;
    this.days = days;
  }
}

export class ComplexFormula {
  isNegated: boolean | null;
  value: string | null;
  functor: string | null;
  deviceKey: string | null;
  complexLeft: ComplexFormula | null;
  operator: string | null;
  complexRight: ComplexFormula | null;

  constructor(
    isNegated: boolean | null,
    value: string | null,
    functor: string | null,
    deviceKey: string | null,
    complexLeft: ComplexFormula | null,
    operator: string | null,
    complexRight: ComplexFormula | null) {
    this.isNegated = isNegated;
    this.value = value;
    this.functor = functor;
    this.deviceKey = deviceKey;
    this.complexLeft = complexLeft;
    this.operator = operator;
    this.complexRight = complexRight;
  }
}
