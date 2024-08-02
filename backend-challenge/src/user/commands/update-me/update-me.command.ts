import { RequestUpdateMeDto } from 'src/user/dtos/request';
import { User } from 'src/user/entities';

export class UpdateMeCommand {
  constructor(
    public readonly auth: User,
    public readonly updateMeDto: RequestUpdateMeDto,
  ) {}
}
