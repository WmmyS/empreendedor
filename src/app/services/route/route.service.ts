import { InjectRepository } from "@nestjs/typeorm";
import RouteEntity from "../../../domain/entities/routes.entity";
import { Repository } from "typeorm";
import SignRoute from "../../models/dtos/route/SignRoute.dto";

export class RouteService {
  constructor(
    @InjectRepository(RouteEntity)
    private routeRepository: Repository<RouteEntity>
  ) {}

  async create(input: SignRoute): Promise<void> {
    await this.routeRepository.save(input);
  }

  async list(): Promise<RouteEntity[]> {
    return await this.routeRepository.find();
  }

  async update(id: number, input: SignRoute): Promise<void> {
    await this.routeRepository.update(id, input);
  }

}
