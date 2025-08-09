import { Inject, Injectable } from "@nestjs/common";
import { Store } from "../../../domain/models/Store";
import SignStoreDto from "../../models/dtos/store/SignStore.dto";
import { StoreService } from "../../services/store/store.service";
import { UserService } from "../../services/user/user.service";
import { UserErrorExceptions } from "../../../exceptions/errors/UserErrorExceptions";

@Injectable()
export class SignStore {

  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(UserService)
    private readonly userService: UserService,

  ) {}

  async execute(store: SignStoreDto): Promise<void> {
    const user = await this.userService.findOne(store.userId);
    if (!user) {
      throw UserErrorExceptions.registry('UserNotFoundException');
    }
    const input = Store.create(store.name, store.description, user);
    return await this.storeService.create(input);
  }

}