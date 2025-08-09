import { User } from '../../../domain/models/User';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../../../domain/entities/users.entity';
import { EncryptService } from '../encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @Inject()
    private readonly encryptService: EncryptService
  ) {}

  async create(user: User): Promise<User> {
    user.password = await this.encryptService.encrypt(user.password);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async hasAdmin(): Promise<boolean> {
    const admin = await this.usersRepository.findOne({ where: { role: {
      name: 'administrator'
    } } });
    return !!admin;
  }
}
