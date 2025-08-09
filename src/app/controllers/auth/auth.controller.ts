import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../../app/services/auth/auth.service';
import { RouteName } from '../../../app/decorators/route.name.decorator';
import { RouteDescription } from '../../../app/decorators/route.description.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import SignInDto from '../../../app/models/dtos/auth/SignIn.dto';
import UserTokenOutputDto from '../../../app/models/dtos/userToken/UserTokenOutput.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Realizar login de usuário' })
  @ApiResponse({ status: 200, description: 'Login de acesso', type: UserTokenOutputDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @RouteName('Sign in')
  @RouteDescription('Faz o login do usuário')
  @Post('/login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
