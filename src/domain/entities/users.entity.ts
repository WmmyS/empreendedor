import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import RoleEntity from './roles.entity';

@Entity('users')
export default class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;
}