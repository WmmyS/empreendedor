import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "../controllers/auth/auth.controller";
import { AuthService } from "../services/auth/auth.service";
import { UserService } from "../services/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../domain/entities/users.entity";
import { EncryptService } from "../services/encryption/encryption.service";
import { UserTokenService } from "../services/userToken/userToken.service";
import UserTokenEntity from "../../domain/entities/user_token.entity";
import { UserMiddleware } from "../middleware/user.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserTokenEntity])],
    providers: [AuthService, UserService, JwtService, EncryptService, UserTokenService],
    controllers: [AuthController]
})
export class AuthModule {}