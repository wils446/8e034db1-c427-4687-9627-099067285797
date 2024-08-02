import { Provider } from '@nestjs/common';
import { LoginHandler } from './login';
import { RegisterHandler } from './register';

export * from './login';
export * from './register';

export const CommandHandlers: Provider[] = [LoginHandler, RegisterHandler];
