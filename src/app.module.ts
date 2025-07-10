import { Module } from '@nestjs/common';
import { ConfigCommand, GenerateCommand, HelpCommand } from './commands';
import { ConfigModule } from './config/config.module';
import { IconGeneratorModule } from './icon-generator';

@Module({
  imports: [ConfigModule, IconGeneratorModule],
  controllers: [],
  providers: [ConfigCommand, GenerateCommand, HelpCommand],
})
export class AppModule {}
