import { RouteName } from '../../../app/decorators/route.name.decorator';
import { ListUsers } from '../../usecases/user/listUsers';
import { SignUser } from '../../usecases/user/signUser';
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { RouteDescription } from '../../../app/decorators/route.description.decorator';
import SignUserDto from '../../models/dtos/user/SignUser.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../../domain/models/User';
import UserListDto from '../../../app/models/dtos/user/UserList.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    @Inject()
    private readonly signUser: SignUser,

    @Inject()
    private readonly listUsers: ListUsers,
  ) {}

  @ApiOperation({ summary: 'Lista os usuários cadastrados no sistema' })
  @ApiResponse({ status: 200, description: 'Listagem dos usuários no sistema', type: User })
  @RouteName('List users')
  @RouteDescription('Listar todos os usuários')
  @Get('/users')
  async findAll(): Promise<UserListDto> {
    return await this.listUsers.execute();
  }

  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Created', type: SignUserDto })
  @RouteName('Create user')
  @RouteDescription('Cadastrar um novo usuário')
  @Post('/users')
  async create(@Body() input: SignUserDto): Promise<any> {
    const output = await this.signUser.execute(input);
    return output;
  }
}