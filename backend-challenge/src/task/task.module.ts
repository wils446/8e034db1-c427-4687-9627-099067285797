import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { TaskRepository } from './repositories';
import { TaskController } from './task.controller';

@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskRepository, ...CommandHandlers],
  exports: [TaskRepository],
})
export class TaskModule {}
