import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import chalk from 'chalk';

interface Config {
  openaiApiKey?: string;
}

@Injectable()
export class ConfigService {
  private readonly configPath = path.join(os.homedir(), '.novaiconrc.json');

  async getOpenAIKey(): Promise<string | null> {
    try {
      const config = await this.loadConfig();
      return config.openaiApiKey || null;
    } catch (error) {
      console.error(
        chalk.red(
          `Error: Could not load config from ${this.configPath} issue: ${(error as Error)?.message}`,
        ),
      );
      return null;
    }
  }

  async setOpenAIKey(apiKey: string): Promise<void> {
    if (!apiKey || !apiKey.startsWith('sk-')) {
      throw new Error(
        'Invalid OpenAI API key format. Key should start with "sk-"',
      );
    }

    try {
      const config = await this.loadConfig();
      config.openaiApiKey = apiKey;
      await this.saveConfig(config);
      console.log(chalk.green(`Config saved to: ${this.configPath}`));
    } catch (error) {
      throw new Error(`Failed to save API key: ${(error as Error)?.message}`);
    }
  }

  async removeOpenAIKey(): Promise<void> {
    try {
      const config = await this.loadConfig();
      config.openaiApiKey = undefined;
      await this.saveConfig(config);
      console.log(chalk.green(`API key removed successfully!`));
    } catch (error) {
      throw new Error(`Failed to remove API key: ${(error as Error)?.message}`);
    }
  }

  private async loadConfig(): Promise<Config> {
    try {
      if (await fs.pathExists(this.configPath)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await fs.readJson(this.configPath);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data || {};
      }
      return {};
    } catch (error) {
      console.warn(
        chalk.yellow(
          `Warning: Could not load config from ${this.configPath} issue: ${(error as Error)?.message}`,
        ),
      );
      return {};
    }
  }

  private async saveConfig(config: Config): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(this.configPath));
      await fs.writeJson(this.configPath, config, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${(error as Error)?.message}`);
    }
  }
}
