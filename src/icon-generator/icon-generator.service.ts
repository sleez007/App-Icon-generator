import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '../config/config.service';
import { IconUtils } from '../utils/icon.utils';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { AxiosError } from 'axios';

@Injectable()
export class IconGeneratorService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateFromFile(filepath: string, outputDir: string): Promise<void> {
    const spinner = ora('Generating icons from file...').start();

    try {
      // Validate file exists
      if (!(await fs.pathExists(filepath))) {
        throw new Error(`File not found: ${filepath}`);
      }

      // Validate file is an image
      const ext = path.extname(filepath).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.gif'].includes(ext)) {
        throw new Error(`Unsupported image format: ${ext}`);
      }

      spinner.text = 'Creating output directory...';
      await fs.ensureDir(outputDir);

      spinner.text = 'Generating icon sizes...';
      await IconUtils.generateIconSizes(filepath, outputDir);

      spinner.succeed(
        chalk.green(`✅ Icons generated successfully in ${outputDir}`),
      );

      // Show generated files
      console.log(chalk.blue('\nGenerated icons:'));
      const iconSizes = [1024, 512, 192, 180, 144, 128, 96, 72, 48];
      for (const size of iconSizes) {
        const filename = `icon-${size}x${size}.png`;
        console.log(chalk.gray(`  ${path.join(outputDir, filename)}`));
      }
    } catch (error) {
      spinner.fail(
        chalk.red(`Failed to generate icons: ${(error as Error).message}`),
      );
      throw error;
    }
  }

  async generateFromPrompt(prompt: string, outputDir: string): Promise<void> {
    const spinner = ora('Generating AI image...').start();

    try {
      // Get OpenAI API key
      const apiKey = await this.configService.getOpenAIKey();
      if (!apiKey) {
        throw new Error(
          'OpenAI API key not found. Please set it using --config flag',
        );
      }

      // Validate prompt
      if (!prompt.trim()) {
        throw new Error('Prompt cannot be empty');
      }

      spinner.text = 'Creating image from prompt...';
      const imageBuffer = await this.generateImageFromPrompt(prompt, apiKey);

      spinner.text = 'Saving temporary image...';
      await fs.ensureDir(outputDir);
      const tempImagePath = path.join(outputDir, 'temp-ai-image.png');
      await fs.writeFile(tempImagePath, imageBuffer);

      spinner.text = 'Generating icon sizes...';
      await IconUtils.generateIconSizes(tempImagePath, outputDir);

      // Clean up temp file
      await fs.remove(tempImagePath);

      spinner.succeed(
        chalk.green(
          `✅ AI-generated icons created successfully in ${outputDir}`,
        ),
      );

      // Show generated files
      console.log(chalk.blue('\nGenerated icons:'));
      const iconSizes = [1024, 512, 192, 180, 144, 128, 96, 72, 48];
      for (const size of iconSizes) {
        const filename = `icon-${size}x${size}.png`;
        console.log(chalk.gray(`  ${path.join(outputDir, filename)}`));
      }
    } catch (error) {
      spinner.fail(
        chalk.red(`Failed to generate AI icons: ${(error as Error).message}`),
      );
      throw error;
    }
  }

  private async generateImageFromPrompt(
    prompt: string,
    apiKey: string,
  ): Promise<Buffer> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<{ data: { url: string }[] }>(
          'https://api.openai.com/v1/images/generations',
          {
            model: 'dall-e-3',
            prompt: `Create a clean, modern mobile app icon: ${prompt}. The icon should be simple, recognizable, and suitable for mobile apps. Use a transparent or solid background.`,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url',
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      if (!response.data?.data?.[0]?.url) {
        throw new Error('No image URL received from OpenAI');
      }

      // Download the generated image
      const imageResponse = await firstValueFrom(
        this.httpService.get(response.data.data[0].url, {
          responseType: 'arraybuffer',
        }),
      );

      return Buffer.from(imageResponse.data);
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        throw new Error('Invalid OpenAI API key');
      } else if ((error as AxiosError).response?.status === 429) {
        throw new Error('OpenAI API rate limit exceeded');
      } else if (
        ((error as AxiosError).response?.data as { error: { message: string } })
          ?.error?.message
      ) {
        throw new Error(
          `OpenAI API error: ${
            (
              (error as AxiosError).response?.data as {
                error: { message: string };
              }
            )?.error?.message
          }`,
        );
      }
      throw new Error(`Failed to generate image: ${(error as Error).message}`);
    }
  }
}
