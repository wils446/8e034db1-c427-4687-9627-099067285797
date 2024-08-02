import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth } from '../commons/decorators';
import { UpdateMeCommand } from './commands';
import { RequestUpdateMeDto } from './dtos/request';
import {
  ResponseGetMeDto,
  ResponseGetTasksDto,
  ResponseUpdateMeDto,
} from './dtos/response';
import { User } from './entities';
import { GetTasksQuery } from './queries';

@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'get auth user', type: ResponseGetMeDto })
  @ApiUnauthorizedResponse()
  async getMe(@Auth() auth: User) {
    return auth;
  }

  @Get('/tasks')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'get auth user tasks',
    type: ResponseGetTasksDto,
  })
  @ApiUnauthorizedResponse()
  async getMyTasks(@Auth() auth: User) {
    return await this.queryBus.execute(new GetTasksQuery(auth));
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'user updated', type: ResponseUpdateMeDto })
  @ApiUnauthorizedResponse()
  async updateUser(
    @Auth() auth: User,
    @Body() bodyPayload: RequestUpdateMeDto,
  ) {
    return await this.commandBus.execute(
      new UpdateMeCommand(auth, bodyPayload),
    );
  }
}
