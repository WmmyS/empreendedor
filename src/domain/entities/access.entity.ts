import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import RoleEntity from "./roles.entity";
import StoreEntity from "./stores.entity";

@Entity('accesses')
export default class AccessEntity {

  @PrimaryColumn({ name: 'roleId' })
  roleId: number;

  @PrimaryColumn({ name: 'storeId' })
  storeId: number;

  @ManyToOne(() => RoleEntity, role => role.accesses)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @ManyToOne(() => StoreEntity, store => store.accesses)
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;
}