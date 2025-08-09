import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { ConfigurationModule } from './configuration.module';
import { RoleModule } from './role.module';
import { LoadModule } from './load.module';
import { StoreModule } from './store.module';
import { UserTokenModule } from './userToken.module';
import { StorageModule } from './storage.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule.provideTypeormModule(),
    UserModule,
    AuthModule,
    ConfigurationModule,
    RoleModule,
    LoadModule,
    StoreModule,
    UserTokenModule,
    StorageModule,
  ],
})
export class AppModule {}
