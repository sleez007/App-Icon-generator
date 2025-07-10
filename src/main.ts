#!/usr/bin/env node
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    logger: ['error', 'warn'],
    cliName: 'nova-icon',
    version: '1.0.0',
  });
}

bootstrap().catch((error: Error) => {
  console.error(`Fatal error: ${error?.message}`);
  process.exit(1);
});
