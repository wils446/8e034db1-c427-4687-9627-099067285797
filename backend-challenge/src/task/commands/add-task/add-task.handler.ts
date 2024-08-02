import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities';
import { TaskRepository } from '../../repositories';
import { AddTaskCommand } from './add-task.command';

@CommandHandler(AddTaskCommand)
export class AddTaskHandler implements ICommandHandler<AddTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(command: AddTaskCommand) {
    const { addTaskDto, auth } = command;

    const task = this.taskRepository.create({
      title: addTaskDto.title,
      description: addTaskDto.description,
      author: auth,
    });

    try {
      await this.taskRepository.save(task);
      return task;
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }
}
