import { RequestLoginDto } from 'src/auth/dtos/request';

export class LoginCommand {
  constructor(public readonly RequestLoginDto: RequestLoginDto) {}
}
