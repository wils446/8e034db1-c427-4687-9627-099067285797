import { Provider } from '@nestjs/common';
import { UpdateMeHandler } from './update-me';

export * from './update-me';

export const CommandHandlers: Provider[] = [UpdateMeHandler];
