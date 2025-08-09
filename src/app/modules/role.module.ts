import { Module } from "@nestjs/common";
import { RoleService } from "../services/role/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import RoleEntity from "../../domain/entities/roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
})
export class RoleModule {}