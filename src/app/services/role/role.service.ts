import { Repository } from "typeorm";
import RoleEntity from "../../../domain/entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import SignAdministratorRoleDto from "../../models/dtos/role/SignAdministratorRole.dto";

export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async create(input: SignAdministratorRoleDto): Promise<void> {
    await this.roleRepository.save(input);
  }

  async hasAdmin(): Promise<boolean> {
    const admin = await this.roleRepository.findOne({ where: { name: 'administrator' } });
    return !!admin;
  }

  async hasUser(): Promise<boolean> {
    const user = await this.roleRepository.findOne({ where: { name: 'user' } });
    return !!user;
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    return await this.roleRepository.findOne({ where: { name } });
  }

}