import SignUserDto from '../../models/dtos/user/SignUser.dto';
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { RoleService } from '../../services/role/role.service';
import { User } from '../../../domain/models/User';
import { UserErrorExceptions } from '../../../exceptions/errors/UserErrorExceptions';

@Injectable()
export class SignUser {

  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(RoleService)
    private readonly roleService: RoleService

  ) {}

  async execute(user: SignUserDto): Promise<any> {
    const input = User.create(user.name, user.email, user.password, user.role);
    const userExists = await this.userService.findByEmail(input.email);
    const userAdmin = await this.userService.hasAdmin();

    if (!userAdmin) {
      const adminRole = await this.roleService.findByName('administrator');
      input.role = adminRole;
    } else {
      this.validateUserInput(input);
      const userRole = await this.roleService.findByName('user');
      input.role = userRole;
    }
    if (userExists) {
      throw UserErrorExceptions.registry('UserAlreadyExistsException');
    }
    return await this.userService.create(input);
  }

  private validateUserInput(user: User): void {
    if (!user.name) {
      throw UserErrorExceptions.registry('NameIsRequiredException');
    }
    if (!user.email) {
      throw UserErrorExceptions.registry('EmailIsRequiredException');
    }
    if (!user.password) {
      throw UserErrorExceptions.registry('PasswordIsRequiredException');
    }
  }

}