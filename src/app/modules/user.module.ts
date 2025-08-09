import { SignUser } from '../usecases/user/signUser';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user/user.controller';
import UserEntity from '../../domain/entities/users.entity';
import RoleEntity from '../../domain/entities/roles.entity';
import { ListUsers } from '../usecases/user/listUsers';
import { UserService } from '../services/user/user.service';
import { RoleService } from '../services/role/role.service';
import { EncryptService } from '../services/encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService, ListUsers, SignUser, RoleService, EncryptService],
  controllers: [UserController],
})
export class UserModule {}