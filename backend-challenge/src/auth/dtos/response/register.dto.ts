import { ApiProperty } from '@nestjs/swagger';

export class ResponseRegisterDto {
  @ApiProperty()
  access_token: string;
}
