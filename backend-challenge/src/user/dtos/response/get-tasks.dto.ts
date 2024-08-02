import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetTasksDto {
  @ApiProperty({ type: () => ResponseTasksDto, isArray: true })
  tasks: ResponseGetTasksDto[];

  @ApiProperty()
  count: number;
}

export class ResponseTasksDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
