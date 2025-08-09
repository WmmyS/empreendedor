import { Module } from "@nestjs/common";
import { ConfigurationController } from "../controllers/configurations/configuration.controller";
import { ConfigurationService } from "../services/configuration/configuration.service";
import { UserService } from "../services/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../domain/entities/users.entity";
import { EncryptService } from "../services/encryption/encryption.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [ConfigurationService, UserService, EncryptService],
  controllers: [ConfigurationController]
})
export class ConfigurationModule {}