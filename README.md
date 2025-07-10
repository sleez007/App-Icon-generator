# 🧩 Nova Icon CLI

**Nova Icon** is a powerful, cross-platform CLI tool built with [NestJS](https://nestjs.com/) that helps developers generate high-quality mobile app icons from either **local images** or **AI-generated prompts** using [OpenAI’s DALL·E 3](https://platform.openai.com/docs/guides/images).

---

## ✨ Features

- **Icon from Images** – Use local image files (PNG, JPG, JPEG, WebP, TIFF, GIF)
- **AI-Powered Icons** – Generate icons from text prompts via OpenAI
- **App-Ready Output** – Creates all standard mobile app icon sizes
- **Secure API Key Management** – Set, get, or remove OpenAI keys locally
- **Image Processing** – High-quality output using [Sharp](https://sharp.pixelplumbing.com/)
- **Cross-Platform** – Works on Windows, macOS, and Linux

---

## 📦 Installation

Install globally:

```bash
npm install -g @innovatespace/nova-icon
```

Or run with `npx` (no installation required):

```bash
# This is not working at the moment, will be fixed in the next release
npx nova-icon --help
```

---

## 🚀 Usage

### 🖼️ Generate Icons from a Local Image

```bash
nova-icon generate --filepath="./path/to/image.png" --output="./icons"

# Shorthand
nova-icon gen -f="./path/to/image.png" -o="./icons"
```

### 🤖 Generate Icons from an AI Prompt

```bash
nova-icon generate --prompt="minimalist weather app icon" --output="./icons"

# Shorthand
nova-icon gen -p="minimalist weather app icon" -o="./icons"
```

---

## 🔐 OpenAI API Key Management

### Set API Key

```bash
nova-icon config --set "sk-your-api-key"

# Shorthands
nova-icon cfg -s "sk-your-api-key"
nova-icon c -s "sk-your-api-key"
```

### Get API Key

```bash
nova-icon config --get

# Shorthands
nova-icon cfg -g
nova-icon c -g
```

### Remove API Key

```bash
nova-icon config --remove

# Shorthands
nova-icon cfg -r
nova-icon c -r
```

---

## 📐 Generated Icon Sizes

Nova Icon CLI generates all essential mobile app icon sizes:

| Platform        | Dimensions (px) |
| --------------- | --------------- |
| App Store       | 1024 × 1024     |
| Android / Web   | 512 × 512       |
| Android         | 192 × 192       |
| iOS             | 180 × 180       |
| General Purpose | 144 × 144       |
|                 | 128 × 128       |
|                 | 96 × 96         |
|                 | 72 × 72         |
|                 | 48 × 48         |

---

## ⚙️ CLI Options

| Option           | Description                           |
| ---------------- | ------------------------------------- |
| `--filepath, -f` | Path to local image file              |
| `--prompt, -p`   | Prompt text for AI-generated icon     |
| `--output, -o`   | Output directory (default: `./icons`) |
| `--set, -s`      | Set your OpenAI API key               |
| `--get, -g`      | Retrieve your stored API key          |
| `--remove, -r`   | Remove stored OpenAI API key          |

---

## 💡 Examples

```bash
# Generate from image
nova-icon gen -f="./assets/logo.png" -o="./icons"

# Generate from prompt
nova-icon gen -p="retro game controller icon"

# Manage API key
nova-icon c -s "sk-your-key"
nova-icon c -g
nova-icon c -r

# View help
nova-icon --help
```

---

## 🧱 Requirements

- **Node.js** v16 or later
- **OpenAI API Key** (only for AI prompt generation)

---

## 🛠 Development

```bash
# Install dependencies
bun install

# Build the project
bun build

# Run in dev mode
bun start:dev
```

---

## 📝 TODO

- [ ] Add Unit Tests
- [ ] Fix Commander default help output for package
- [ ] Fix issue with using the package without installation i.e `npx nova-icon --help`

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Open issues
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT © [InnovateSpace](https://github.com/sleez007/App-Icon-generator/blob/main/LICENSE)
