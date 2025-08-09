import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when credentials are valid', async () => {
      const email = 'test@example.com';
      const pass = 'password';
      const user = { id: 1, email, password: pass };
      const accessToken = 'someAccessToken';

      mockUserService.findByEmail.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue(accessToken);

      const result = await authService.signIn(email, pass);
      expect(result).toEqual({ access_token: accessToken });
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { sub: user.id, username: user.email },
        { secret: process.env.JWT_SECRET },
      );
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const email = 'test@example.com';
      const pass = 'wrongPassword';
      const user = { id: 1, email, password: 'password' };

      mockUserService.findByEmail.mockResolvedValue(user);

      await expect(authService.signIn(email, pass)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      const email = 'test@example.com';
      const pass = 'password';

      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(authService.signIn(email, pass)).rejects.toThrow(UnauthorizedException);
    });
  });
});
