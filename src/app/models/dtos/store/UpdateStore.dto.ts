import { ApiProperty } from "@nestjs/swagger";

export default class UpdateStoreDto {
  @ApiProperty({ example: "Loja de exemplo", description: 'Nome da loja' })
  name: string;

  @ApiProperty({ example: "Loja de exemplo atualizada", description: 'Nome da loja' })
  description: string;

}