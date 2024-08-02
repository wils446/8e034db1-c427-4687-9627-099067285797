import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { UpdateMeCommand } from './update-me.command';

@CommandHandler(UpdateMeCommand)
export class UpdateMeHandler implements ICommandHandler<UpdateMeCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateMeCommand): Promise<any> {
    const { updateMeDto, auth } = command;

    if (updateMeDto.username) auth.username = updateMeDto.username;
    if (updateMeDto.password) auth.password = updateMeDto.password;

    try {
      await this.userRepository.save(auth);
      return auth;
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }
}
