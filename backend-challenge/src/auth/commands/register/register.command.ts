import { RequestRegisterDto } from 'src/auth/dtos/request';

export class RegisterCommand {
  constructor(public readonly RequestRegisterDto: RequestRegisterDto) {}
}
