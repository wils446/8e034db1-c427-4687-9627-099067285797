import { Provider } from '@nestjs/common';
import { GetTasksHandler } from './get-tasks/get-tasks.handler';

export * from './get-tasks';

export const QueryHandlers: Provider[] = [GetTasksHandler];
