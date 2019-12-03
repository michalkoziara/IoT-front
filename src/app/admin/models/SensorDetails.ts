export class SensorDetails {
  name: string;
  isUpdated: string | boolean;
  isActive: string | boolean;
  isAssigned: boolean;
  deviceKey: string;
  sensorTypeName: string;
  sensorUserGroup: string;
  readingValue: string | boolean;

  constructor(
    name: string,
    isUpdated: string | boolean,
    isActive: string | boolean,
    isAssigned: boolean,
    deviceKey: string,
    sensorTypeName: string,
    sensorUserGroup: string,
    readingValue: string | boolean) {
    this.name = name;
    this.isUpdated = isUpdated;
    this.isActive = isActive;
    this.isAssigned = isAssigned;
    this.deviceKey = deviceKey;
    this.sensorTypeName = sensorTypeName;
    this.sensorUserGroup = sensorUserGroup;
    this.readingValue = readingValue;
  }
}
