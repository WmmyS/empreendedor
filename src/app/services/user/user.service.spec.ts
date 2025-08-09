import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../../../domain/entities/users.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    mockUserRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('hasAdmin', () => {
    it('should return true if an administrator user exists', async () => {
      jest.spyOn(mockUserRepo, 'findOne').mockResolvedValue({ role: 'administrator' } as UserEntity);
      const result = await userService.hasAdmin();
      expect(result).toBe(true);
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({ where: { role: 'administrator' } });
    });

    it('should return false if no administrator user exists', async () => {
      jest.spyOn(mockUserRepo, 'findOne').mockResolvedValue(null);
      const result = await userService.hasAdmin();
      expect(result).toBe(false);
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({ where: { role: 'administrator' } });
    });
  });
});
