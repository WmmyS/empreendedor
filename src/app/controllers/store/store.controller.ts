import { SignStore } from "../../usecases/store/SignStore";
import SignStoreDto from "../../models/dtos/store/SignStore.dto";
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { RouteDescription } from "../../../app/decorators/route.description.decorator";
import { RouteName } from "../../../app/decorators/route.name.decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListUserStores } from "../../../app/usecases/store/listUserStores";
import { User } from "../../../app/decorators/user.decorator";
import UserEntity from "../../../domain/entities/users.entity";
import { UpdatStore } from "src/app/usecases/store/UpdateStore";
import UpdateStoreDto from "src/app/models/dtos/store/UpdateStore.dto";
import StoreEntity from "src/domain/entities/stores.entity";

@ApiBearerAuth()
@ApiTags('Store')
@Controller()
export class StoreController {
  constructor(
    @Inject()
    private readonly signStore: SignStore,

    @Inject()
    private readonly listStoresByUser: ListUserStores,

    @Inject()
    private readonly updatStore: UpdatStore,
  ) {}

  @ApiOperation({ summary: 'Registra uma loja' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @RouteName('Create store')
  @RouteDescription('Cadastra uma nova loja')
  @Post('/store')
  async create(@Body() input: SignStoreDto, @User() user: UserEntity): Promise<void> {
    input.userId = user.id;
    return await this.signStore.execute(input);
  }

  @ApiOperation({ summary: 'Lista as lojas cadastradas pelo usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Listagem das lojas cadastradas pelo usuário' })
  @RouteName('List stores by user')
  @RouteDescription('Lista as lojas cadastradas pelo usuário')
  @Get('/my-stores')
  async listStores(@User() user: UserEntity): Promise<any> {
    const userId = user.id;
    return await this.listStoresByUser.execute(userId);
  }

  @ApiOperation({ summary: 'Atualiza a loja pelo usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Atualização de loja do usuário', type: StoreEntity })
  @ApiParam({ name: 'id', required: true, description: 'Id da loja' })
  @HttpCode(HttpStatus.OK)
  @RouteName('Update stores by user')
  @RouteDescription('Atualiza a loja pelo usuário')
  @Patch('/update-my-store/:id')
  async updateStore(@Body() input: UpdateStoreDto,@Param() params: any, @User() user: UserEntity): Promise<StoreEntity> {
    const userId = user.id;
    return await this.updatStore.execute(Number(params.id), input, userId);
  }

}