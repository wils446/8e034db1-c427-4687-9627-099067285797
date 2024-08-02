import { RequestAddTaskDto } from 'src/task/dtos/request/add-task.dto';
import { User } from 'src/user/entities';

export class AddTaskCommand {
  constructor(
    public readonly auth: User,
    public readonly addTaskDto: RequestAddTaskDto,
  ) {}
}
