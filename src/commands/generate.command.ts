import { Command, CommandRunner, Option } from 'nest-commander';
import { IconGeneratorService } from '../icon-generator/icon-generator.service';
import chalk from 'chalk';

interface GenerateOptions {
  filepath?: string;
  prompt?: string;
  output: string;
}

@Command({
  name: 'generate',
  description: 'Generate mobile app icons from local images or AI prompts',
  aliases: ['gen'],
})
export class GenerateCommand extends CommandRunner {
  constructor(private readonly iconGeneratorService: IconGeneratorService) {
    super();
  }
  async run(passedParams: string[], options: GenerateOptions): Promise<void> {
    try {
      // Validate input
      if (!options.filepath && !options.prompt) {
        console.error(
          chalk.red('❌ Error: Please provide either --filepath or --prompt'),
        );
        console.log(chalk.blue('\nUsage examples:'));
        console.log(
          '  nova-icon generate --filepath="./my-image.png" --output="./icons"',
        );
        console.log(
          '  nova-icon generate --prompt="modern app icon for a fitness app" --output="./icons"',
        );
        return;
      }

      if (options.filepath && options.prompt) {
        console.error(
          chalk.red(
            '❌ Error: Please provide either --filepath OR --prompt, not both',
          ),
        );
        return;
      }

      // Generate icons
      if (options.filepath) {
        await this.iconGeneratorService.generateFromFile(
          options.filepath,
          options.output,
        );
      } else if (options.prompt) {
        await this.iconGeneratorService.generateFromPrompt(
          options.prompt,
          options.output,
        );
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
      process.exit(1);
    }
  }

  @Option({
    flags: '-f, --filepath <path>',
    description: 'Path to local image file',
  })
  parseFilepath(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --prompt <text>',
    description: 'AI prompt to generate image',
  })
  parsePrompt(val: string): string {
    return val;
  }

  @Option({
    flags: '-o, --output <path>',
    description: 'Output directory for generated icons',
    defaultValue: './icons',
  })
  parseOutput(val: string): string {
    return val;
  }
}
