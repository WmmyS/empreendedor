import AccessEntity from "../entities/access.entity";
import { User } from "./User";

export class Store {
    id: number;
    name: string;
    description: string;
    create_at: Date;
    updated_at: Date;
    created_by: User;
    accesses?: AccessEntity[]; // criar entidade de acesso

  constructor(
    name: string,
    description: string,
    createdBy: User,
  ) {
    this.name = name;
    this.description = description;
    this.created_by = createdBy;
  }

  static create(name: string, description: string, user: User): Store {
    return new Store(name, description, user);
  }

}