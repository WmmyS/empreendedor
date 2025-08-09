import { Test, TestingModule } from '@nestjs/testing';
import { SignUser } from './signUser';
import { UserService } from '../../services/user/user.service';
import { User } from '../../../domain/models/User';
import { UserErrorExceptions } from '../../../exceptions/errors/UserErrorExceptions';
import { SignUserModel } from '../../models/dtos/user/SignUser.dto';

// Mock da classe UserService
const mockUserService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  hasAdmin: jest.fn(),
};

describe('SignUser', () => {
  let service: SignUser;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUser,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<SignUser>(SignUser);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new user and assign role as administrator if no admin exists', async () => {
      const signUserModel: SignUserModel = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user',
      };

      const newUser = User.create(signUserModel.name, signUserModel.email, signUserModel.password, signUserModel.role);
      const createdUser = { ...newUser, id: 1 };

      mockUserService.findByEmail.mockResolvedValue(null);  // Simula que o usuário não existe
      mockUserService.hasAdmin.mockResolvedValue(false);  // Simula que não há administrador

      mockUserService.create.mockResolvedValue(createdUser);

      const result = await service.execute(signUserModel);

      expect(userService.findByEmail).toHaveBeenCalledWith(newUser.email);
      expect(userService.hasAdmin).toHaveBeenCalled();
      expect(userService.create).toHaveBeenCalledWith(expect.objectContaining({ role: 'administrator' }));
      expect(result).toEqual(createdUser);
    });

    it('should create a new user and assign role as user if admin exists', async () => {
      const signUserModel: SignUserModel = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password456',
        role: 'user',
      };

      const newUser = User.create(signUserModel.name, signUserModel.email, signUserModel.password, signUserModel.role);
      const createdUser = { ...newUser, id: 2 };

      mockUserService.findByEmail.mockResolvedValue(null);  // Simula que o usuário não existe
      mockUserService.hasAdmin.mockResolvedValue(true);  // Simula que já existe um administrador

      mockUserService.create.mockResolvedValue(createdUser);

      const result = await service.execute(signUserModel);

      expect(userService.findByEmail).toHaveBeenCalledWith(newUser.email);
      expect(userService.hasAdmin).toHaveBeenCalled();
      expect(userService.create).toHaveBeenCalledWith(expect.objectContaining({ role: 'user' }));
      expect(result).toEqual(createdUser);
    });

    it('should throw UserAlreadyExistsException if user already exists', async () => {
      const signUserModel: SignUserModel = {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password789',
        role: 'user',
      };

      const existingUser = { id: 1, email: signUserModel.email, name: signUserModel.name, role: 'user' };

      mockUserService.findByEmail.mockResolvedValue(existingUser);  // Simula que o usuário já existe
      mockUserService.hasAdmin.mockResolvedValue(false);  // Simula que não há administrador

      try {
        await service.execute(signUserModel);
      } catch (error) {
        expect(error).toEqual(UserErrorExceptions.registry('UserAlreadyExistsException'));
      }

      expect(userService.findByEmail).toHaveBeenCalledWith(signUserModel.email);
    });
  });
});
