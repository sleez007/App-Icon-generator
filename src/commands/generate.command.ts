import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'generate',
  description: 'Generate mobile app icons from local images or AI prompts',
  aliases: ['gen'],
})
export class GenerateCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>) {
    console.log('Generate command', passedParams, options);
    return Promise.resolve();
  }
}
