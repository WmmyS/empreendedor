import { InjectRepository } from "@nestjs/typeorm";
import StoreEntity from "../../../domain/entities/stores.entity";
import { Repository } from "typeorm";
import { Store } from "../../../domain/models/Store";

export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private routeRepository: Repository<StoreEntity>
  ) {}

  async create(input: Store): Promise<void> {
    await this.routeRepository.save(input);
  }

  async list(): Promise<StoreEntity[]> {
    return await this.routeRepository.find();
  }

  async update(id: number, input: Store): Promise<StoreEntity> {
    await this.routeRepository.update(id, input);
    return await this.routeRepository.findOne({ where: { id } });
  }

  async listByUserId(userId: number): Promise<StoreEntity[]> {
    console.log(userId);
    return await this.routeRepository.find({ where: { created_by: {
      id: userId
    } } });
  }

  async findById(id: number, relations?: string[] ): Promise<StoreEntity> {
    return await this.routeRepository.findOne({ where: { id }, relations });
  }

}