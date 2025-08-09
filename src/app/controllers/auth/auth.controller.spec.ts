import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../../app/services/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when credentials are valid', async () => {
      const signInDto = { email: 'test@example.com', password: 'password' };
      const accessToken = 'someAccessToken';

      mockAuthService.signIn.mockResolvedValue({ access_token: accessToken });

      const result = await authController.signIn(signInDto);
      expect(result).toEqual({ access_token: accessToken });
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto.email, signInDto.password);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const signInDto = { email: 'test@example.com', password: 'wrongPassword' };

      mockAuthService.signIn.mockRejectedValue(new UnauthorizedException());

      await expect(authController.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
