export class Sensor {
  name: string;
  isActive: boolean | string;
  sensorReadingValue: boolean | string;
  deviceKey: string;

  constructor(name: string, isActive: boolean | string, sensorReadingValue: boolean | string, deviceKey: string) {
    this.name = name;
    this.isActive = isActive;
    this.sensorReadingValue = sensorReadingValue;
    this.deviceKey = deviceKey;
  }
}
