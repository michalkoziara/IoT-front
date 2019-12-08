export class UserGroupInList {
  name: string;
  isAssignedTo: boolean;

  constructor(name: string, isAssignedTo: boolean) {
    this.name = name;
    this.isAssignedTo = isAssignedTo;
  }
}
