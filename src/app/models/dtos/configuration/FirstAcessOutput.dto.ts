import { ApiProperty } from "@nestjs/swagger";

export default class FirstAcessOutputDto {

  @ApiProperty({ example: true, description: 'Retorno de boleano de primeiro acesso' })
  fistAccess: boolean;

  @ApiProperty({ example: 'O sistema já foi configurado', description: 'Mensagem de status do sistema' })
  message: string;
};