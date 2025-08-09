import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import StoreEntity from "../../domain/entities/stores.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreService } from "../services/store/store.service";
import { UserService } from "../services/user/user.service";
import { SignStore } from "../usecases/store/SignStore";
import { StoreController } from "../controllers/store/store.controller";
import UserEntity from "../../domain/entities/users.entity";
import { EncryptService } from "../services/encryption/encryption.service";
import { UserMiddleware } from "../middleware/user.middleware";
import { UserTokenService } from "../services/userToken/userToken.service";
import UserTokenEntity from "../../domain/entities/user_token.entity";
import { ListUserStores } from "../usecases/store/listUserStores";
import { JwtService } from "@nestjs/jwt";
import { UpdatStore } from "../usecases/store/UpdateStore";

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, UserEntity, UserTokenEntity])],
  providers: [StoreService, UserService, SignStore, EncryptService, UserTokenService, ListUserStores, JwtService, UpdatStore],
  controllers: [StoreController]
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({ path: 'store', method: RequestMethod.POST });
    consumer.apply(UserMiddleware).forRoutes({ path: 'my-stores', method: RequestMethod.GET });
    consumer.apply(UserMiddleware).forRoutes({ path: 'update-my-store/:id', method: RequestMethod.PATCH });
  }
}