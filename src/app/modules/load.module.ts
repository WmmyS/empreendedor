import { Module } from "@nestjs/common";
import { LoadStart } from "../../infra/jobs/load.start";
import { SignAdministratorRole } from "../usecases/role/signAdministratorRole";
import { RoleService } from "../services/role/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import RoleEntity from "../../domain/entities/roles.entity";
import { SignUserRole } from "../usecases/role/signUserRole";
import { SingRoutes } from "../usecases/route/SignRoutes";
import { RouteService } from "../services/route/route.service";
import RouteEntity from "../../domain/entities/routes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RouteEntity])],
  providers: [LoadStart, SignAdministratorRole, SignUserRole, RoleService, SingRoutes, RouteService]
})
export class LoadModule {}