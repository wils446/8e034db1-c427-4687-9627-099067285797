import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../commons/configs';
import { AuthGuard } from '../commons/guards/auth.guard';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...CommandHandlers,
  ],
})
export class AuthModule {}
