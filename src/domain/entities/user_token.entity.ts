import { Entity, ManyToOne, PrimaryColumn, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import UserEntity from './users.entity';

@Entity('user_token')
export default class UserTokenEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  token: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expires_at: Date;
}
