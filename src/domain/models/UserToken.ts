import UserEntity from "../entities/users.entity";
import { User } from "./User";

export class UserToken {
  user: UserEntity
  token: string
  created_at: Date
  expires_at: Date

  constructor(
    user: User,
    token: string,
    expires_at: Date,

  ) {
    this.user = user;
    this.token = token;
    this.expires_at = expires_at;
  }

  static create(user: User, token: string, expires_at: Date): UserToken {
    return new UserToken(user, token, expires_at);
  }
}