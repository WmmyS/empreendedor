import { InjectRepository } from "@nestjs/typeorm";
import UserTokenEntity from "../../../domain/entities/user_token.entity";
import { Repository } from "typeorm";
import SignUserTokenDto from "../../models/dtos/userToken/SignUserToken.dto";
import { UserToken } from "../../../domain/models/UserToken";
import { UserService } from "../user/user.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserTokenService {
  constructor (
    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,

    @Inject()
    private readonly userService: UserService
  ) {}

  async create(input: SignUserTokenDto): Promise<UserTokenEntity> {
    const userFound = await this.userService.findUserById(input.user_id);
    const user = new UserToken(userFound, input.token, input.expires_at);
    return await this.userTokenRepository.save(user);
  }

  async findByToken(token: string): Promise<UserTokenEntity | null> {
    return await this.userTokenRepository.findOne({ where: { token }, relations: ['user'] });
  }

  async remove(token: string): Promise<void> {
    await this.userTokenRepository.delete({ token });
  }
}