import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import FirstAcessOutputDto from "../../../app/models/dtos/configuration/FirstAcessOutput.dto";

@Injectable()
export class ConfigurationService {
    constructor(
      @Inject()
      private readonly userService: UserService
    ) { }

    async firstAccess(): Promise<FirstAcessOutputDto> {
      const hasAdmin = await this.userService.hasAdmin();

      if (hasAdmin) {
        return {
          fistAccess: false,
          message: 'O sistema já foi configurado',
        };
      }

      return {
        fistAccess: true,
        message: 'O sistema ainda não foi configurado',
      };
    }
}