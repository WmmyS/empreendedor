export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: any;
  create_at: Date;
  updated_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    role: any,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static create(name: string, email: string, password: string, role: any): User {
    return new User(name, email, password, role);
  }

}