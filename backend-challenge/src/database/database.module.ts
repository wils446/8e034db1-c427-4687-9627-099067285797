import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../commons/configs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        ...config,
        type: 'postgres',
        synchronize: true,
        entities: [__dirname + '/../**/**/*.entity.{js,ts}'],
        subscribers: [__dirname + '/../**/**/*.subscriber.{js,ts}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
