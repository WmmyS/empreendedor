import { Inject } from "@nestjs/common";
import { RoleService } from "../../../app/services/role/role.service";

export class SignUserRole {
  constructor(
    @Inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  async execute() {
    const roleExists = await this.roleService.hasUser();
    if (roleExists) {
      return;
    }
    return await this.roleService.create({
      description: 'Usuário comum',
      name: 'user'
    });
  }
}