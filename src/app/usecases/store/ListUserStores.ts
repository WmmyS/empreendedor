import { Injectable } from "@nestjs/common";
import { StoreService } from "../../../app/services/store/store.service";

@Injectable()
export class ListUserStores {

    constructor(
      private readonly storeService: StoreService
    ) {}
    async execute(userId: number): Promise<any> {
        const stores = await this.storeService.listByUserId(userId);
        return {
            stores: stores
        };
    }
}