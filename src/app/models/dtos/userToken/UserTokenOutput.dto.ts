import { ApiProperty } from "@nestjs/swagger";

export default class UserTokenOutputDto {

  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6Indlc2xleW1hcmNvc21AZ21haWwuY29tIiwiaWF0IjoxNzM3MjE4MDg5LCJleHAiOjE3MzczMDQ0ODl9.LNMZsQt_kz4q79j1Or-0ZzNp9_lZ7im0aZ5Cqvrp10o",
    description: 'Chave de acesso' })
  access_token: string;

  @ApiProperty({ example: "1/20/2025, 3:01:00 PM", description: 'Data de expiração' })
  expires_at: string;
}