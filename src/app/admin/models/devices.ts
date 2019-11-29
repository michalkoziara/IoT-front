export class Devices {
  name: string;
  isActive: string;
  deviceKey: string;

  constructor(name: string, isActive: string, deviceKey: string) {
    this.name = name;
    this.isActive = isActive;
    this.deviceKey = deviceKey;
  }
}
