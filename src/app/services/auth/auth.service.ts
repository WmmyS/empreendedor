import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../encryption/encryption.service';
import configuration from '../../../infra/configurations/configuration';
import { UserTokenService } from '../userToken/userToken.service';
import { TimeTolls } from '../../../tools/TimeTools';
import UserTokenOutputModel from '../../models/dtos/userToken/UserTokenOutput.dto';
import { DateTimeTool } from 'src/tools/DateTimeTool';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
    private userTokenService: UserTokenService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<UserTokenOutputModel> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isMatch = await this.encryptService.match(pass, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: configuration().jwt.secret,
      expiresIn: configuration().jwt.expiresIn,

    });

    const seconds = TimeTolls.convertToSeconds(configuration().jwt.expiresIn);
    const eapireDate = DateTimeTool.addSecondsToNow(seconds);

    await this.userTokenService.create(
      { token: access_token,
        user_id: user.id,
        expires_at: eapireDate,
      }
    );

    return { access_token, expires_at: DateTimeTool.formatToLocalDateString(eapireDate) };
  }

}
