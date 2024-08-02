import { User } from 'src/user/entities';

export class DeleteTaskCommand {
  constructor(public readonly auth: User, public readonly taskId: string) {}
}
