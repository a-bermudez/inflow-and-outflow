export class User {
  constructor(
    private uid: string,
    private nickName: string,
    private email: string
  ) {}

  getUid(): string {
    return this.uid;
  }
  getName(): string {
    return this.nickName;
  }
  getEmail(): string {
    return this.email;
  }
}
