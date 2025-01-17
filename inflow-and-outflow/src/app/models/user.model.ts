export class User {
  static fromFirebase(email: string, nickName: string, uid: string) {
    return new User(email, nickName, uid);
  }
  constructor(
    public email: string,
    public nickName: string,
    public uid: string
  ) {}
}
