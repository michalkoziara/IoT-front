export class Formula {
  name: string;
  rule: ComplexFormula;

  constructor(name: string, rule: ComplexFormula) {
    this.name = name;
    this.rule = rule;
  }
}

class ComplexFormula {
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
