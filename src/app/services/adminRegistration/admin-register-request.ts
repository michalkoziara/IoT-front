export class AdminRegisterRequest {
  username: string;
  email: string;
  password: string;
  productKey: string;
  productPassword: string;

  constructor(username: string, email: string, password: string, productKey: string, productPassword: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.productKey = productKey;
    this.productPassword = productPassword;
  }
}
