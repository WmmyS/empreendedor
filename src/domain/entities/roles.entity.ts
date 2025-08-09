import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./users.entity";
import RouteEntity from "./routes.entity";
import AccessEntity from "./access.entity";

@Entity('roles')
export default class RoleEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserEntity, user => user.role)
  users: UserEntity;

  @ManyToMany(() => RouteEntity, route => route.roles)
  @JoinTable()
  routes: RouteEntity[];

  @OneToMany(() => AccessEntity, access => access.role)
  accesses: AccessEntity[];

}