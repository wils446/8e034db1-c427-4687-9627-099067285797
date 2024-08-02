import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities';
import { TaskRepository } from '../../repositories';
import { DeleteTaskCommand } from './delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(command: DeleteTaskCommand) {
    const result = await this.taskRepository.delete({
      id: command.taskId,
      authorId: command.auth.id,
    });
    if (result.affected === 0) throw new NotFoundException('task is not found');
  }
}
