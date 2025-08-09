import { ApiProperty } from "@nestjs/swagger";

export default class SignUserDto {

  @ApiProperty({ example: "John Doe", description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: "johndoe@email.com", description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: "Johndoe123", description: 'Senha do usuário' })
  password: string;

  role: string;
}