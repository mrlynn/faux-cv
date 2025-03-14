## PDF Generation

To use the PDF generation feature, you'll need to install the optional dependencies:

```bash
npm install puppeteer showdown
```

These are listed as optional dependencies in the package.json to keep the main package lightweight for users who don't need PDF functionality.# faux-cv

Generate realistic fake resumes in markdown and JSON formats with customizable options for different industries, experience levels, and more.

## Installation

```bash
npm install -g faux-cv
```

Or use directly with npx:

```bash
npx faux-cv
```

## Features

- Generate realistic fake resumes with detailed work experience, education, skills, and certifications
- Customize for different industries (tech, finance, healthcare, marketing, education)
- Adjust experience levels to generate junior, mid-level, or senior profiles
- Output in markdown, JSON, PDF, or multiple formats
- Use custom templates with Mustache templating language
- Configurable options for gender, contact details, output filenames and more
- Generate multiple resumes at once with a single command

## Usage

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

- `tech`: Software Engineering, IT, Data Science
- `finance`: Banking, Investment, Accounting
- `healthcare`: Medical, Health Services
- `marketing`: Digital Marketing, Content, Branding
- `education`: Teaching, Educational Administration

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

Generate multiple resumes in a single batch PDF file:
```bash
npx faux-cv -c 5 -f pdf -b -i marketing
```

Use a custom template:
```bash
npx faux-cv -t ./my-template.mustache
```

## Programmatic Usage

You can also use faux-cv as a library in your Node.js projects:

```javascript
const { generateResume } = require('faux-cv');

// Generate a resume with custom options
const resume = generateResume({
  industry: 'marketing',
  experienceYears: 6,
  format: 'both',
  gender: 'female',
  includeLinkedin: true,
  includeWebsite: true,
  format: 'both',
  pdfStyle: 'modern',
  pdfColor: '#2c3e50'
});

console.log(resume.markdown); // Markdown formatted resume
console.log(resume.json);     // Resume data as a JavaScript object
```

## Creating Custom Templates

faux-cv uses Mustache templating. Create your own template files with the following variables:

- `{{name}}`: Full name
- `{{contactInfo.email}}`: Email address
- `{{contactInfo.phone}}`: Phone number
- `{{contactInfo.location}}`: Location (City, State)
- `{{contactInfo.linkedin}}`: LinkedIn URL
- `{{contactInfo.website}}`: Personal website URL
- `{{summary}}`: Professional summary

For work experience (loop through `{{#experience}}` array):
- `{{position}}`: Job title
- `{{company}}`: Company name
- `{{startDate}}`: Start date
- `{{endDate}}`: End date
- `{{#bulletPoints}}`: List of accomplishments

For education (loop through `{{#education}}` array):
- `{{degree}}`: Degree type
- `{{field}}`: Field of study
- `{{institution}}`: School name
- `{{graduationYear}}`: Year of graduation
- `{{#details}}`: Additional education details

For skills (loop through `{{#skillCategories}}` array):
- `{{category}}`: Skill category name
- `{{skills}}`: List of skills in that category

For certifications (loop through `{{#certifications}}` array):
- List of certification names

## License

MIT# faux-cv
