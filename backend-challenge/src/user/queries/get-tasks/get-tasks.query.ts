import { User } from '../../entities';

export class GetTasksQuery {
  constructor(public readonly auth: User) {}
}
