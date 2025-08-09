import { ApiProperty } from "@nestjs/swagger";

export default class SignStoreDto {
  @ApiProperty({ example: "Loja de exemplo", description: 'Nome da loja' })
  name: string;

  @ApiProperty({ example: "Loja de exemplo criada", description: 'Nome da loja' })
  description: string;

  userId: number;

}