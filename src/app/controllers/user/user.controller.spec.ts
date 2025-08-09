import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SignUser } from '../../usecases/user/signUser';
import { ListUsers } from '../../usecases/user/listUsers';
import SignUserModel from '../../models/dtos/user/SignUser.dto';

describe('UserController', () => {
  let userController: UserController;
  let signUser: SignUser;
  let listUsers: ListUsers;

  const mockSignUser = {
    execute: jest.fn(),
  };

  const mockListUsers = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: SignUser,
          useValue: mockSignUser,
        },
        {
          provide: ListUsers,
          useValue: mockListUsers,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    signUser = module.get<SignUser>(SignUser);
    listUsers = module.get<ListUsers>(ListUsers);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      mockListUsers.execute.mockResolvedValue(users);

      expect(await userController.findAll()).toBe(users);
      expect(listUsers.execute).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const input: SignUserModel = { name: 'John Doe', email: 'john@example.com', password: 'password', role: 'user' };
      const output = { id: 1, ...input };
      mockSignUser.execute.mockResolvedValue(output);

      expect(await userController.create(input)).toBe(output);
      expect(signUser.execute).toHaveBeenCalledWith(input);
    });
  });
});
