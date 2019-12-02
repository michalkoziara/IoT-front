export class SensorReading {
  value: string | number | boolean;
  date: string;

  constructor(value: string | number | boolean, date: string) {
    this.value = value;
    this.date = date;
  }
}
