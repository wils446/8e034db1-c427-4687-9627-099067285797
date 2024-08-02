import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../user/entities/user.entity';
import { UserRepository } from '../../../user/repositories/user.repository';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginCommand) {
    const { RequestLoginDto } = command;

    const user = await this.userRepository.findOneByOrThrow(
      { username: RequestLoginDto.username },
      `user with username ${RequestLoginDto.username} is not exists.`,
    );

    const isMatch = await bcrypt.compare(
      RequestLoginDto.password,
      user.password,
    );
    if (!isMatch) throw new UnauthorizedException('Password is wrong.');

    try {
      return {
        access_token: await this.jwtService.signAsync({ sub: user.id }),
      };
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }
}
