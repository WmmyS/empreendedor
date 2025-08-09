import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTokenService } from "../services/userToken/userToken.service";
import { UserService } from "../services/user/user.service";
import UserTokenEntity from "../../domain/entities/user_token.entity";
import UserEntity from "../../domain/entities/users.entity";
import { EncryptService } from "../services/encryption/encryption.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTokenEntity, UserEntity])],
    providers: [UserTokenService, UserService, EncryptService],
    controllers: []
})
export class UserTokenModule {}