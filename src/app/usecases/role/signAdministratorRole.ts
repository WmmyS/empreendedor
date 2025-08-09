import { Inject } from "@nestjs/common";
import { RoleService } from "../../../app/services/role/role.service";

export class SignAdministratorRole {
  constructor(
    @Inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  async execute() {
    const roleExists = await this.roleService.hasAdmin();
    if (roleExists) {
      return;
    }
    return await this.roleService.create({
      description: 'Usuário administrador',
      name: 'administrator'
    });
  }
}