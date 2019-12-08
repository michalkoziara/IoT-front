export class SensorDetails {
  name: string;
  isUpdated: boolean | string;
  isActive: boolean | string;
  isAssigned: boolean;
  deviceKey: string;
  sensorTypeName: string;
  sensorUserGroup: string | null;
  readingValue: boolean | string;

  constructor(
    name: string,
    isUpdated: boolean | string,
    isActive: boolean | string,
    isAssigned: boolean,
    deviceKey: string,
    sensorTypeName: string,
    sensorUserGroup: string | null,
    readingValue: boolean | string) {
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
