import { Provider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  BaseRepository,
  generateCustomRepositoryMethods,
} from '../../database/base.repository';
import { User } from '../entities/user.entity';

export type UserRepository = BaseRepository<User>;

export const customUserRepositoryMethods =
  generateCustomRepositoryMethods<User>();

export const UserRepository: Provider = {
  provide: getRepositoryToken(User),
  inject: [getDataSourceToken()],
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(User).extend(customUserRepositoryMethods),
};
