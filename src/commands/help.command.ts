import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'help',
  description: 'Display help information',
})
export class HelpCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>) {
    console.log('Help command', passedParams, options);
    return Promise.resolve();
  }
}
