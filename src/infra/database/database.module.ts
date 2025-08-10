import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "../configurations/configuration";
import UserEntity from "../../domain/entities/users.entity";
import RoleEntity from "../../domain/entities/roles.entity";
import RouteEntity from "../../domain/entities/routes.entity";
import StoreEntity from "../../domain/entities/stores.entity";
import AccessEntity from "../../domain/entities/access.entity";
import UserTokenEntity from "src/domain/entities/user_token.entity";

export class DatabaseModule {

  static provideEntities() {
    // todo: Adicionar uma forma de inserir as entidades no TypeOrmModule autometicamente ao criar uma nova entidade
    const entities = [UserEntity, RoleEntity, RouteEntity, StoreEntity, AccessEntity, UserTokenEntity];
    return entities;
  }

  static provideTypeormModule() {
    return TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.user,
      password: configuration().database.password,
      database: configuration().database.database,
      entities: DatabaseModule.provideEntities(),
      synchronize: false, // Usar migrations para gerenciar o schema
      migrations: [__dirname + '/../migrations/*.{ts,js}'],
      migrationsRun: false
    })
  }
}