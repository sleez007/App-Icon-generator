import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'config',
  description: 'Manage OpenAI API key configuration',
})
export class ConfigCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>) {
    console.log('Config command', passedParams, options);
    return Promise.resolve();
  }
}
