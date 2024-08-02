import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth } from '../commons/decorators';
import { User } from '../user/entities';
import { AddTaskCommand, DeleteTaskCommand } from './commands';
import { RequestAddTaskDto } from './dtos/request/add-task.dto';
import { ResponseAddTaskDto } from './dtos/response';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'task created', type: ResponseAddTaskDto })
  @ApiUnauthorizedResponse()
  async addTask(@Auth() auth: User, @Body() bodyPayload: RequestAddTaskDto) {
    return await this.commandBus.execute(new AddTaskCommand(auth, bodyPayload));
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'task deleted' })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse({ description: 'task is not found' })
  async deleteTask(@Auth() auth: User, @Param('taskId') taskId: string) {
    return await this.commandBus.execute(new DeleteTaskCommand(auth, taskId));
  }
}
