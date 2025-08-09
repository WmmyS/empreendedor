import { ApiProperty } from "@nestjs/swagger";

export default class SignInDto {

  @ApiProperty({ example: "wesleymarcosm@gmail.com", description: 'Email de cadastro do usuário' })
  email: string;

  @ApiProperty({ example: "Wesley123", description: 'Senha de cadastro do usuário' })
  password: string;
}