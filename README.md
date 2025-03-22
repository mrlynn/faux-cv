[![npm version](https://img.shields.io/npm/v/faux-cv.svg)](https://www.npmjs.com/package/faux-cv)
[![CI](https://github.com/mrlynn/faux-cv/actions/workflows/test.yml/badge.svg)](https://github.com/mrlynn/faux-cv/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/faux-cv.svg)](https://www.npmjs.com/package/faux-cv)

# Faux-CV

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mrlynn/faux-cv/main.yml?label=CI)](https://github.com/mrlynn/faux-cv/actions?query=branch%3Amain)
[![GitHub stars](https://img.shields.io/github/stars/mrlynn/faux-cv?style=social)](https://github.com/mrlynn/faux-cv)
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

Generate multiple resumes in a single batch PDF file:
```bash
npx faux-cv -c 5 -f pdf -b -i marketing
```

Use a custom template:
```bash
npx faux-cv -t ./my-template.mustache
```

## 📚 Programmatic Usage

You can use faux-cv as a library in your Node.js projects:

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
  pdfStyle: 'modern',
  pdfColor: '#2c3e50'
});

console.log(resume.markdown); // Markdown formatted resume
console.log(resume.json);     // Resume data as a JavaScript object
```

## 🎨 Creating Custom Templates

Faux-CV uses Mustache templating. Create your own template files with the following variables:

### Basic Information

- `{{name}}`: Full name
- `{{contactInfo.email}}`: Email address
- `{{contactInfo.phone}}`: Phone number
- `{{contactInfo.location}}`: Location (City, State)
- `{{contactInfo.linkedin}}`: LinkedIn URL
- `{{contactInfo.website}}`: Personal website URL
- `{{summary}}`: Professional summary

### Experience Section

Loop through `{{#experience}}` array:
- `{{position}}`: Job title
- `{{company}}`: Company name
- `{{startDate}}`: Start date
- `{{endDate}}`: End date
- `{{#bulletPoints}}`: List of accomplishments

### Education Section

Loop through `{{#education}}` array:
- `{{degree}}`: Degree type
- `{{field}}`: Field of study
- `{{institution}}`: School name
- `{{graduationYear}}`: Year of graduation
- `{{#details}}`: Additional education details

### Skills & Certifications

For skills (loop through `{{#skillCategories}}` array):
- `{{category}}`: Skill category name
- `{{skills}}`: List of skills in that category

For certifications (loop through `{{#certifications}}` array):
- List of certification names

## 📝 Example Output

### JSON Format

```json
{
  "name": "Jordan Smith",
  "contactInfo": {
    "email": "jordan.smith@example.com",
    "phone": "555-123-4567",
    "location": "New York, NY",
    "linkedin": "linkedin.com/in/jordan-smith-456789",
    "website": "jordansmith.com"
  },
  "summary": "Experienced Software Engineer with 7 years of proven expertise in JavaScript, Python, and AWS...",
  "experience": [
    {
      "position": "Senior Developer",
      "company": "TechCorp",
      "startDate": "January 2020",
      "endDate": "Present",
      "bulletPoints": [
        "Led development of cloud infrastructure, resulting in 40% improvement in system performance",
        "Managed team of 5 engineers implementing microservices architecture"
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor's",
      "field": "Computer Science",
      "institution": "State University",
      "graduationYear": 2016,
      "details": ["GPA: 3.8", "Dean's List"]
    }
  ],
  "skillCategories": [
    {
      "category": "Technical Skills",
      "skills": "JavaScript, Python, AWS, Docker, Kubernetes, React, Node.js"
    },
    {
      "category": "Soft Skills",
      "skills": "Team Leadership, Communication, Problem Solving"
    }
  ],
  "certifications": [
    "AWS Certified Solutions Architect",
    "Certified Kubernetes Administrator"
  ]
}
```

### Markdown Format

```markdown
# Jordan Smith

jordan.smith@example.com | 555-123-4567 | New York, NY | [LinkedIn](linkedin.com/in/jordan-smith-456789) | [Website](jordansmith.com)

## Summary
Experienced Software Engineer with 7 years of proven expertise in JavaScript, Python, and AWS...

## Experience
### Senior Developer | TechCorp | January 2020 - Present
- Led development of cloud infrastructure, resulting in 40% improvement in system performance
- Managed team of 5 engineers implementing microservices architecture

## Education
### Bachelor's in Computer Science | State University | 2016
- GPA: 3.8
- Dean's List

## Skills
### Technical Skills
JavaScript, Python, AWS, Docker, Kubernetes, React, Node.js

### Soft Skills
Team Leadership, Communication, Problem Solving

## Certifications
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run coverage report:

```bash
npm run test:coverage
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/username/faux-cv/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 🙏 Acknowledgements

- [Faker.js](https://github.com/faker-js/faker) - For generating realistic data
- [Mustache.js](https://github.com/janl/mustache.js) - For templating
- [Puppeteer](https://github.com/puppeteer/puppeteer) & [Showdown](https://github.com/showdownjs/showdown) - For PDF generation