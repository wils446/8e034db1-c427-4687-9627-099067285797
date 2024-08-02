import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../commons/decorators';
import { LoginCommand, RegisterCommand } from './commands';
import { RequestLoginDto, RequestRegisterDto } from './dtos/request';
import { ResponseLoginDto } from './dtos/response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'login success',
    type: ResponseLoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'password is wrong' })
  @ApiNotFoundResponse({ description: 'username is not registered' })
  async login(@Body() bodyPayload: RequestLoginDto) {
    return await this.commandBus.execute(new LoginCommand(bodyPayload));
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'login success',
    type: ResponseLoginDto,
  })
  @ApiConflictResponse({ description: 'username already registered.' })
  async register(@Body() bodyPayload: RequestRegisterDto) {
    return await this.commandBus.execute(new RegisterCommand(bodyPayload));
  }
}
