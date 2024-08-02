import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../user/entities';
import { UserRepository } from '../../../user/repositories';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: RegisterCommand): Promise<any> {
    const { RequestRegisterDto } = command;

    await this.checkUsernameExists(RequestRegisterDto.username);

    const user = this.userRepository.create({
      username: RequestRegisterDto.username,
      password: RequestRegisterDto.password,
    });

    try {
      await this.userRepository.save(user);
      return {
        access_token: await this.jwtService.signAsync({ sub: user.id }),
      };
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }

  async checkUsernameExists(username: string) {
    if (await this.userRepository.existsBy({ username }))
      throw new ConflictException(
        `user with username ${username} already exists!`,
      );
  }
}
