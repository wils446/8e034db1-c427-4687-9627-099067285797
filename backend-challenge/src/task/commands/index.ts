import { Provider } from '@nestjs/common';
import { AddTaskHandler } from './add-task';
import { DeleteTaskHandler } from './delete-task';

export * from './add-task';
export * from './delete-task';

export const CommandHandlers: Provider[] = [AddTaskHandler, DeleteTaskHandler];
