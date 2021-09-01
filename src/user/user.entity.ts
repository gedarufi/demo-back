export interface IUser {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export class User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;

  constructor(user: Partial<IUser>) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  }

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`.trim();
  }
}
