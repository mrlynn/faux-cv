[![npm version](https://img.shields.io/npm/v/faux-cv.svg)](https://www.npmjs.com/package/faux-cv)
[![CI](https://github.com/mrlynn/faux-cv/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/mrlynn/faux-cv/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/faux-cv.svg)](https://www.npmjs.com/package/faux-cv)
[![GitHub stars](https://img.shields.io/github/stars/mrlynn/faux-cv?style=social)](https://github.com/mrlynn/faux-cv)

# Faux-CV

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mrlynn/faux-cv/main.yml?label=CI)](https://github.com/mrlynn/faux-cv/actions?query=branch%3Amain)
[![Build Status](https://img.shields.io/github/workflow/status/mrlynn/faux-cv/Test)](https://github.com/mrlynn/faux-cv/actions)

> Generate realistic fake resumes for testing and development. Customizable by industry, experience level, and output format.

<p align="center">
  <img src="https://raw.githubusercontent.com/mrlynn/faux-cv/main/img/logo.png" width="300" alt="Faux-CV Logo">
</p>

## 🚀 Features

- ✨ **Realistic content** - Professionally written work experience, skills, education, and certifications
- 🏢 **Multiple industries** - Specialized profiles for tech, finance, healthcare, marketing, and education sectors
- 📊 **Experience levels** - Generate junior, mid-level, or senior professional profiles
- 📄 **Multiple formats** - Output in Markdown, JSON, PDF, or all formats
- 🎨 **Customizable templates** - Use built-in styles or create your own with Mustache templating
- 👥 **Batch generation** - Create multiple resumes with a single command
- 🔄 **Reproducible output** - Set random seeds for consistent results

## 📦 Installation

Install globally:

```bash
npm install -g faux-cv
```

Or use directly with npx:

```bash
npx faux-cv
```

### PDF Support

To use the PDF generation feature, install the optional dependencies:

```bash
npm install puppeteer showdown
```

## 🛠️ Usage

### Command Line

```bash
npx faux-cv --industry tech --experience 7 --format both
```

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--industry <industry>` | `-i` | Industry specialization | `tech` |
| `--experience <years>` | `-e` | Years of experience | `5` |
| `--format <format>` | `-f` | Output format (markdown, json, pdf, both) | `both` |
| `--gender <gender>` | `-g` | Gender (male, female) | Random |
| `--output <filename>` | `-o` | Output file name (without extension) | Person's name |
| `--no-linkedin` | `-l` | Exclude LinkedIn profile | LinkedIn included |
| `--no-website` | `-w` | Exclude personal website | Website random |
| `--template <filepath>` | `-t` | Custom Mustache template file | Default template |
| `--count <number>` | `-c` | Number of resumes to generate | `1` |
| `--seed <value>` | `-s` | Random seed for consistent generation | Random |
| `--pdf-style <style>` | `-p` | PDF style (default, modern, minimal, professional) | `default` |
| `--pdf-color <color>` | | Primary color for PDF (hex code) | `#0066cc` |
| `--batch-pdf` | `-b` | Create a single PDF containing all resumes | `false` |

### Available Industries

- **Tech**: Software Engineering, IT, Data Science
- **Finance**: Banking, Investment, Accounting
- **Healthcare**: Medical, Health Services
- **Marketing**: Digital Marketing, Content, Branding
- **Education**: Teaching, Educational Administration

### Examples

Generate a tech resume with 3 years of experience:
```bash
npx faux-cv -i tech -e 3
```

Generate 5 healthcare resumes with 10+ years of experience:
```bash
npx faux-cv -i healthcare -e 12 -c 5
```

Generate a finance resume in JSON format only:
```bash
npx faux-cv -i finance -f json
```

Generate a professional PDF resume with custom styling:
```bash
npx faux-cv -f pdf -p professional --pdf-color "#336699"
```