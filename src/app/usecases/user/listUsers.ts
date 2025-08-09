import UserListDto from '../../models/dtos/user/UserList.dto';
import { UserService } from '../../services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListUsers {

  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async execute(): Promise<UserListDto> {
    const users = await this.userService.findAll();
    return {
      users: users
    }
  }
}