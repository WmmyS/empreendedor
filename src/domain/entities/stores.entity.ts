import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import UserEntity from "./users.entity";
import AccessEntity from "./access.entity";

@Entity('stores')
export default class StoreEntity {
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

  @ManyToOne(() => UserEntity)
  created_by: UserEntity;

  @OneToMany(() => AccessEntity, access => access.store)
  accesses: AccessEntity[];

  // customers
  // services
  // products
  // orders
}