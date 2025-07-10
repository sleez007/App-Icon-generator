import chalk from 'chalk';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'help',
  description: 'Show detailed help information',
  aliases: ['h'],
})
export class HelpCommand extends CommandRunner {
  async run(): Promise<void> {
    console.log(chalk.blue.bold('\n🎨 Icon Generator CLI\n'));
    console.log(
      chalk.white(
        'Generate mobile app icons from local images or AI prompts\n',
      ),
    );

    console.log(chalk.yellow.bold('Commands:'));
    console.log(
      chalk.white('  generate, gen    Generate icons from file or prompt'),
    );
    console.log(chalk.white('  config           Manage OpenAI API key'));
    console.log(chalk.white('  help, h          Show this help message\n'));

    console.log(chalk.yellow.bold('Examples:'));
    console.log(chalk.gray('  # Generate from local image'));
    console.log(
      chalk.white(
        '  nova-icon generate --filepath="./logo.png" --output="./icons"',
      ),
    );
    console.log(chalk.gray('  \n  # Generate from AI prompt'));
    console.log(
      chalk.white(
        '  nova-icon generate --prompt="modern app icon for a fitness app"',
      ),
    );
    console.log(chalk.gray('  \n  # Set OpenAI API key'));
    console.log(
      chalk.white('  nova-icon config --set="sk-your-openai-api-key"'),
    );
    console.log(chalk.gray('  \n  # Quick generate (default command)'));
    console.log(chalk.white('  nova-icon --filepath="./image.png"'));
    console.log(chalk.white('  nova-icon --prompt="cute cat app icon"\n'));

    console.log(chalk.yellow.bold('Generated Icon Sizes:'));
    console.log(chalk.white('  1024x1024, 512x512, 192x192, 180x180, 144x144'));
    console.log(chalk.white('  128x128, 96x96, 72x72, 48x48\n'));

    console.log(chalk.yellow.bold('Supported Image Formats:'));
    console.log(chalk.white('  PNG, JPG, JPEG, WebP, TIFF, GIF\n'));

    console.log(
      chalk.green(
        'For more information, visit: https://github.com/sleez007/App-Icon-generator',
      ),
    );
    return Promise.resolve();
  }
}
