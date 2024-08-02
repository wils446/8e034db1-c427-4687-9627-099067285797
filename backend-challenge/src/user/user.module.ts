import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskModule } from '../task/task.module';
import { CommandHandlers } from './commands';
import { MeController } from './me.controller';
import { QueryHandlers } from './queries';
import { UserRepository } from './repositories';

@Module({
  imports: [CqrsModule, TaskModule],
  controllers: [MeController],
  providers: [UserRepository, ...CommandHandlers, ...QueryHandlers],
  exports: [UserRepository],
})
export class UserModule {}
