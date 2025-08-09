import { Controller, Get } from "@nestjs/common";
import { ConfigurationService } from "../../../app/services/configuration/configuration.service";
import { RouteName } from "../../../app/decorators/route.name.decorator";
import { RouteDescription } from "../../../app/decorators/route.description.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import FirstAcessOutputDto from "../../../app/models/dtos/configuration/FirstAcessOutput.dto";

@ApiTags('Configuration')
@Controller('configurations')
export class ConfigurationController {
    constructor(
      private readonly configurationService: ConfigurationService
    ) {}

    @ApiOperation({ summary: 'Retorna se o sistema já foi configurado' })
    @ApiResponse({ status: 200, description: 'Retorna se o sistema já foi configurado', type: FirstAcessOutputDto })
    @RouteName('First access')
    @RouteDescription('Rota para validar o primeiro acesso e configurar o sistema')
    @Get('/fist-access')
    async fistAccess(): Promise<any> {
      return await this.configurationService.firstAccess();
    }
}