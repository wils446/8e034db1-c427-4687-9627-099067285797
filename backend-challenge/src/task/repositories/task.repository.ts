import { Provider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  BaseRepository,
  generateCustomRepositoryMethods,
} from '../../database/base.repository';
import { Task } from '../entities';

export type TaskRepository = BaseRepository<Task>;

const customTaskRepositoryMethods = generateCustomRepositoryMethods<Task>();

export const TaskRepository: Provider = {
  provide: getRepositoryToken(Task),
  inject: [getDataSourceToken()],
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(Task).extend(customTaskRepositoryMethods),
};
