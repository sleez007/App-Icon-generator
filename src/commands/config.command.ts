import { Command, CommandRunner, Option } from 'nest-commander';
import { ConfigService } from '../config/config.service';
import chalk from 'chalk';

interface ConfigOptions {
  set?: string;
  get?: boolean;
  remove?: boolean;
}

@Command({
  name: 'config',
  description: 'Manage OpenAI API key configuration',
})
export class ConfigCommand extends CommandRunner {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async run(passedParams: string[], options: ConfigOptions): Promise<void> {
    try {
      if (options.set) {
        await this.configService.setOpenAIKey(options.set);
        console.log(chalk.green('✅ OpenAI API key saved successfully!'));
        return;
      }

      if (options.get) {
        const apiKey = await this.configService.getOpenAIKey();
        if (apiKey) {
          const maskedKey = `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`;
          console.log(chalk.blue(`Current API key: ${maskedKey}`));
        } else {
          console.log(chalk.yellow('No API key configured'));
        }
        return;
      }

      if (options.remove) {
        await this.configService.removeOpenAIKey();
        console.log(chalk.green('✅ OpenAI API key removed successfully!'));
        return;
      }

      // Show help if no options provided
      console.log(chalk.blue.bold('\n🔧 Configuration Management\n'));
      console.log(
        chalk.white('Manage your OpenAI API key for AI-generated icons\n'),
      );
      console.log(chalk.yellow('Examples:'));
      console.log('  nova-icon config --set="sk-your-openai-api-key"');
      console.log('  nova-icon config --get');
      console.log('  nova-icon config --remove\n');
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
      process.exit(1);
    }
  }

  @Option({
    flags: '-s, --set <api key>',
    description: 'Set OpenAI API key',
  })
  parseSet(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --get',
    description: 'Get current API key (masked)',
  })
  parseGet(): boolean {
    return true;
  }

  @Option({
    flags: '-r, --remove',
    description: 'Remove stored API key',
  })
  parseRemove(): boolean {
    return true;
  }
}
