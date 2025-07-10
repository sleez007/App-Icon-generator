# Icon Generator CLI

A powerful NestJS-based CLI tool for generating mobile app icons from local images or AI prompts using OpenAI's DALL-E.

## Features

- 🖼️ Generate icons from local images (PNG, JPG, JPEG, WebP, TIFF, GIF)
- 🤖 Generate icons from AI prompts using OpenAI's DALL-E 3
- 📱 Creates all standard mobile app icon sizes
- 🔐 Secure API key storage in user's home directory
- 🎨 High-quality image processing with Sharp
- 💻 Cross-platform support (Windows, macOS, Linux)

## Installation

```bash
npm install -g icon-gen
```

Or use without installation:

```bash
npx icon-gen --help
```

## Usage

### Generate icons from a local image

```bash
npx icon-gen --filepath="./my-image.png" --output="./icons"
```

### Generate icons from an AI prompt

```bash
npx icon-gen --prompt="modern minimalist icon for a fitness app" --output="./icons"
```

### Set OpenAI API key

```bash
npx icon-gen --config="sk-your-openai-api-key"
```

## Generated Icon Sizes

The tool generates icons in all standard mobile app sizes:

- 1024x1024px (App Store)
- 512x512px
- 192x192px
- 180x180px (iOS)
- 144x144px
- 128x128px
- 96x96px
- 72x72px
- 48x48px

## Options

- `--filepath <path>` - Path to local image file
- `--prompt <text>` - AI prompt to generate image
- `--output <path>` - Output directory (default: ./icons)
- `--config <apikey>` - Set OpenAI API key

## Examples

```bash
# Generate from local file
npx icon-gen --filepath="c:/images/logo.png" --output="c:/app/icons"

# Generate from AI prompt
npx icon-gen --prompt="cute cat app icon with blue background"

# Set API key
npx icon-gen --config="sk-proj-abc123..."

# Show help
npx icon-gen --help
```

## Requirements

- Node.js >= 16.0.0
- OpenAI API key (for AI-generated icons)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run locally
npm run start:dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
