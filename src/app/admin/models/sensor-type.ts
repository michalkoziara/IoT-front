export class SensorType {
  name: string;
  readingType: string;
  rangeMin: number;
  rangeMax: number;
  enumerator: { number: number; text: string }[];

  constructor(name: string, readingType: string, rangeMin: number, rangeMax: number, enumerator: { number: number; text: string }[]) {
    this.name = name;
    this.readingType = readingType;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.enumerator = enumerator;
  }
}
