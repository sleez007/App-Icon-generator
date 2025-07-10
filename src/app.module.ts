import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigCommand, GenerateCommand, HelpCommand } from './commands';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ConfigCommand, GenerateCommand, HelpCommand],
})
export class AppModule {}
