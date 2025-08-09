import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./users.entity";
import RoleEntity from "./roles.entity";

@Entity('routes')
export default class RouteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  path: string;

  @Column()
  method: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => RoleEntity, role => role.routes)
  roles: RoleEntity[];

}