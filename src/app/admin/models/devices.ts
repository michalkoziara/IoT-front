export class Devices {
  name: string;
  isActive: string | boolean;
  deviceKey: string;

  constructor(name: string, isActive: string | boolean, deviceKey: string) {
    this.name = name;
    this.isActive = isActive;
    this.deviceKey = deviceKey;
  }
}
