import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../../app/services/store/store.service";
import { StoreErrorExceptions } from "../../../exceptions/errors/StoreErrorExceptions";
import UpdateStoreDto from "../../../app/models/dtos/store/UpdateStore.dto";
import { Store } from "src/domain/models/Store";
import StoreEntity from "src/domain/entities/stores.entity";

@Injectable()
export class UpdatStore {
  constructor(
    @Inject()
    private readonly storeService: StoreService,
  ) {}

  async execute(id: number, store: UpdateStoreDto, userId: number): Promise<StoreEntity> {
    if (!store.name || !store.description) {
      throw StoreErrorExceptions.registry('StoreInvalidDataException');
    }

    const storeExists = await this.storeService.findById(id, ['created_by']);

    if (!storeExists) {
      throw StoreErrorExceptions.registry('StoreNotFoundException');
    }

    if (storeExists.created_by.id !== userId) {
      throw StoreErrorExceptions.registry('StoreNotFoundException');
    }

    const storeUpdated = Store.create(store.name, store.description, storeExists.created_by);
    return this.storeService.update(id, storeUpdated);
  }

}