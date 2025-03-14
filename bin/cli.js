#!/usr/bin/env node

// bin/cli.js

const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const { generateResume, availableIndustries } = require('../lib');
const { generatePDF } = require('../lib/pdf/generator');
const { generateBatchPDF } = require('../lib/pdf/batchGenerator');

// Detect if we're running in test mode
const isTestMode = process.env.NODE_ENV === 'test';

// Configure command line options
program
  .version(require('../package.json').version)
  .description('Generate realistic fake resumes in markdown, JSON, and PDF formats')
  .option('-i, --industry <industry>', 'Industry specialization', 'tech')
  .option('-e, --experience <years>', 'Years of experience', parseInt, 5)
  .option('-f, --format <format>', 'Output format (markdown, json, pdf, both)', 'both')
  .option('-g, --gender <gender>', 'Gender (male, female)')
  .option('-o, --output <filename>', 'Output file name (without extension)')
  .option('-l, --no-linkedin', 'Exclude LinkedIn profile')
  .option('-w, --no-website', 'Exclude personal website')
  .option('-t, --template <filepath>', 'Custom Mustache template file')
  .option('-c, --count <number>', 'Number of resumes to generate', parseInt, 1)
  .option('-s, --seed <value>', 'Random seed for consistent generation')
  .option('-p, --pdf-style <style>', 'PDF style (default, modern, minimal, professional)', 'default')
  .option('--pdf-color <color>', 'Primary color for PDF (hex code)', '#0066cc')
  .option('-b, --batch-pdf', 'Create a single PDF containing all resumes');

// Parse arguments
program.parse(process.argv);
const options = program.opts();

// Check if the last argument might be a count that wasn't properly captured with -c
if (program.args.length > 0 && !isNaN(parseInt(program.args[0], 10))) {
  options.count = parseInt(program.args[0], 10);
  if (!isTestMode) {
    console.log(`Detected count from args: ${options.count}`);
  }
}

// Ensure count is a valid number
if (isNaN(options.count)) {
  options.count = 1;
}

// Validate industry
if (!availableIndustries.includes(options.industry)) {
  console.error(chalk.red(`Invalid industry: ${options.industry}`));
  console.error(chalk.yellow(`Available industries: ${availableIndustries.join(', ')}`));
  process.exit(1);
}

// Set random seed if provided
if (options.seed !== undefined) {
  const { faker } = require('@faker-js/faker');
  faker.seed(parseInt(options.seed, 10) || 0);
}

// Read template file if provided
let template;
if (options.template) {
  try {
    template = fs.readFileSync(options.template, 'utf8');
  } catch (error) {
    console.error(chalk.red(`Error reading template file: ${error.message}`));
    process.exit(1);
  }
}

// Create output directory if it doesn't exist
if (!fs.existsSync('output') && !isTestMode) {
  fs.mkdirSync('output');
}

// Function to generate a single resume
const generateSingleResume = (index) => {
  try {
    // Generate resume data
    const resume = generateResume({
      industry: options.industry,
      experienceYears: options.experience,
      format: options.format,
      gender: options.gender,
      includeLinkedin: options.linkedin,
      includeWebsite: options.website,
      template: template,
      pdfStyle: options.pdfStyle,
      pdfColor: options.pdfColor
    });
    
    // Skip file operations in test mode
    if (isTestMode) {
      return { name: resume.json?.name || 'Test User', files: [] };
    }
    
    // Use the person's name as the filename if not specified
    const personName = resume.json.name;
    const baseName = options.output || personName.toLowerCase().replace(/\s+/g, '-');
    const fileName = options.count > 1 ? `${baseName}-${index+1}` : baseName;
    
    const filePaths = [];
    
    // Save JSON if requested
    if (options.format === 'json' || options.format === 'both') {
      const jsonPath = `output/${fileName}.json`;
      fs.writeFileSync(jsonPath, JSON.stringify(resume.json, null, 2));
      filePaths.push(jsonPath);
    }
    
    // Save markdown if requested
    let markdownPath;
    if (options.format === 'markdown' || options.format === 'both' || options.format === 'pdf') {
      markdownPath = `output/${fileName}.md`;
      fs.writeFileSync(markdownPath, resume.markdown);
      filePaths.push(markdownPath);
    }
    
    // Generate PDF if requested and not using batch PDF
    if (options.format === 'pdf' && !options.batchPdf) {
      const pdfPath = `output/${fileName}.pdf`;
      generatePDF(markdownPath, pdfPath, {
        style: options.pdfStyle,
        color: options.pdfColor,
        name: personName
      });
      filePaths.push(pdfPath);
    }
    
    return { name: personName, files: filePaths, markdownPath };
  } catch (error) {
    console.error(chalk.red(`Error generating resume: ${error.message}`));
    if (error.stack && !isTestMode) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
};

// Generate multiple resumes
const generateResumes = async () => {
  const resumes = [];
  
  console.log(chalk.blue(`Generating ${options.count} resume(s)...`));
  
  for (let i = 0; i < options.count; i++) {
    const resume = generateSingleResume(i);
    resumes.push(resume);
    
    if (!isTestMode) {
      console.log(chalk.green(`✓ Resume for ${resume.name} generated successfully`));
      resume.files.forEach(file => {
        console.log(chalk.cyan(`  - ${file}`));
      });
    }
  }
  
  // Generate batch PDF if requested
  if (options.format === 'pdf' && options.batchPdf && options.count > 1 && !isTestMode) {
    try {
      const markdownFiles = resumes.map(r => r.markdownPath);
      const names = resumes.map(r => r.name);
      const batchFileName = options.output || 'batch-resumes';
      const pdfPath = `output/${batchFileName}.pdf`;
      
      console.log(chalk.blue(`Generating batch PDF with ${markdownFiles.length} resumes...`));
      
      await generateBatchPDF(markdownFiles, pdfPath, {
        style: options.pdfStyle,
        color: options.pdfColor,
        names
      });
      
      console.log(chalk.green(`✓ Batch PDF generated successfully`));
      console.log(chalk.cyan(`  - ${pdfPath}`));
    } catch (error) {
      console.error(chalk.red(`Error generating batch PDF: ${error.message}`));
      process.exit(1);
    }
  }
  
  if (isTestMode) {
    console.log(`Resume generated successfully`);
  } else {
    if (options.count > 1) {
      console.log(chalk.green(`\n${options.count} resumes generated in the 'output' directory`));
    } else {
      console.log(chalk.green(`\nResume generated in the 'output' directory`));
    }
  }
};

// Run the generator
generateResumes().catch(err => {
  console.error(chalk.red(`Unexpected error: ${err.message}`));
  process.exit(1);
});