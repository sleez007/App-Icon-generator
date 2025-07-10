import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigCommand, GenerateCommand, HelpCommand } from './commands';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [ConfigCommand, GenerateCommand, HelpCommand],
})
export class AppModule {}
