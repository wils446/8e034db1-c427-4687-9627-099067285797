import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../task/entities';
import { TaskRepository } from '../../../task/repositories';
import { GetTasksQuery } from './get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(query: GetTasksQuery) {
    const [tasks, count] = await this.taskRepository.findAndCount({
      where: { authorId: query.auth.id },
    });

    return { tasks, count };
  }
}
