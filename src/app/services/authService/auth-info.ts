export class AuthInfo {
  authToken: string;
  isAdmin: string;
  username: string;

  constructor() {
    this.authToken = '';
    this.isAdmin = '';
    this.username = '';
  }
}
