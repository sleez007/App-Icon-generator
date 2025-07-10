import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export class IconUtils {
  static readonly ICON_SIZES = [1024, 512, 192, 180, 144, 128, 96, 72, 48];

  static async generateIconSizes(
    inputPath: string,
    outputDir: string,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await fs.ensureDir(outputDir);

    const promises = this.ICON_SIZES.map(async (size) => {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

      try {
        await sharp(inputPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png({
            quality: 100,
            compressionLevel: 6,
          })
          .toFile(outputPath);

        console.log(chalk.green(`✓ Generated: ${size}x${size}px`));
      } catch (error) {
        console.error(
          chalk.red(
            `✗ Failed to generate ${size}x${size}px: ${(error as Error).message}`,
          ),
        );
        throw error;
      }
    });

    await Promise.all(promises);
  }
}
