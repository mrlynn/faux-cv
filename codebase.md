# batch-resumes.pdf

This is a binary file of the type: PDF

# faux-cv-1.0.0.tgz

This is a binary file of the type: Binary

# img/logo.png

This is a binary file of the type: Image

# lib/data/industries.js

```js
/**
 * Industry-specific data for resume generation
 */
module.exports = {
    tech: {
      jobTitles: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Site Reliability Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Product Manager', 'UX Designer', 'UI Designer'],
      companies: ['TechCorp', 'ByteSystems', 'Cloudify', 'DataSphere', 'InnovateX', 'CodeBridge', 'QuantumSoft', 'Algorithmics', 'DevStream', 'NextGen Computing'],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'TypeScript', 'Vue.js', 'Angular', 'Express', 'Django', 'Flask', 'TensorFlow', 'PyTorch'],
      degrees: ['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science', 'Computer Engineering'],
      certifications: ['AWS Certified Solutions Architect', 'Certified Kubernetes Administrator', 'Microsoft Certified: Azure Developer', 'Google Cloud Professional Cloud Architect', 'Certified Scrum Master']
    },
    finance: {
      jobTitles: ['Financial Analyst', 'Investment Banker', 'Portfolio Manager', 'Risk Analyst', 'Financial Advisor', 'Accountant', 'Auditor', 'Financial Controller', 'Compliance Officer', 'Actuary'],
      companies: ['GlobalBank', 'InvestCo', 'Capital Partners', 'Wealth Management Group', 'Asset Management Inc.', 'Financial Services Ltd.', 'Investment Solutions', 'Equity Partners', 'First Capital', 'Fidelity Group'],
      skills: ['Financial Modeling', 'Valuation', 'M&A', 'Financial Analysis', 'Risk Management', 'Bloomberg Terminal', 'Excel', 'VBA', 'Portfolio Management', 'Credit Analysis', 'Forecasting', 'Budgeting', 'Financial Reporting', 'SOX Compliance', 'GAAP', 'IFRS'],
      degrees: ['Finance', 'Accounting', 'Economics', 'Business Administration', 'Mathematics', 'Statistics'],
      certifications: ['CFA (Chartered Financial Analyst)', 'CPA (Certified Public Accountant)', 'FRM (Financial Risk Manager)', 'CFP (Certified Financial Planner)', 'CAIA (Chartered Alternative Investment Analyst)']
    },
    healthcare: {
      jobTitles: ['Registered Nurse', 'Physician Assistant', 'Medical Lab Technician', 'Healthcare Administrator', 'Medical Research Scientist', 'Clinical Data Manager', 'Health Informatics Specialist', 'Pharmaceutical Sales Rep', 'Medical Device Engineer', 'Healthcare Consultant'],
      companies: ['MediCare Systems', 'HealthFirst', 'Care Solutions', 'BioLife Sciences', 'MedTech Innovations', 'HealthPlus', 'Life Sciences Corp', 'National Health Services', 'WellCare Group', 'PharmaGene'],
      skills: ['Patient Care', 'Clinical Research', 'Medical Terminology', 'Healthcare Regulations', 'EMR/EHR Systems', 'HIPAA Compliance', 'Medical Coding', 'Clinical Data Analysis', 'Patient Advocacy', 'Medical Device Knowledge', 'Healthcare IT Systems', 'Quality Assurance'],
      degrees: ['Nursing', 'Healthcare Administration', 'Public Health', 'Biology', 'Chemistry', 'Biomedical Engineering'],
      certifications: ['Registered Nurse (RN)', 'Certified Nursing Assistant (CNA)', 'Basic Life Support (BLS)', 'Advanced Cardiac Life Support (ACLS)', 'Certified Healthcare Administrative Professional (CHAP)']
    },
    marketing: {
      jobTitles: ['Marketing Manager', 'Digital Marketing Specialist', 'SEO Specialist', 'Content Strategist', 'Social Media Manager', 'Brand Manager', 'Marketing Analyst', 'Product Marketing Manager', 'Growth Hacker', 'Email Marketing Specialist'],
      companies: ['BrandWorks', 'Digital Reach', 'MarketEdge', 'ContentCraft', 'SocialSphere', 'Growth Tactics', 'Engage Marketing', 'Brand Builders', 'MarketSense', 'Conversion Pros'],
      skills: ['Digital Marketing', 'SEO/SEM', 'Social Media Marketing', 'Content Creation', 'Email Marketing', 'Google Analytics', 'A/B Testing', 'CRM Systems', 'Marketing Automation', 'Adobe Creative Suite', 'Market Research', 'Campaign Management', 'Conversion Optimization', 'Copywriting'],
      degrees: ['Marketing', 'Communications', 'Business Administration', 'Public Relations', 'Advertising', 'Journalism'],
      certifications: ['Google Analytics Certification', 'HubSpot Inbound Marketing', 'Facebook Blueprint', 'Google Ads Certification', 'Content Marketing Certification']
    },
    education: {
      jobTitles: ['Teacher', 'Professor', 'Curriculum Developer', 'Education Administrator', 'School Counselor', 'Education Consultant', 'Instructional Designer', 'Training Specialist', 'Education Researcher', 'Academic Advisor'],
      companies: ['Learning Solutions', 'Knowledge Academy', 'Educational Services Inc.', 'EdTech Innovations', 'Teaching Excellence', 'Academic Partners', 'Learning Futures', 'Education First', 'Curriculum Designers', 'Smart Learning'],
      skills: ['Curriculum Development', 'Lesson Planning', 'Student Assessment', 'Classroom Management', 'Educational Technology', 'Learning Management Systems', 'Instructional Design', 'Student Engagement', 'Educational Research', 'Special Education', 'Online Teaching'],
      degrees: ['Education', 'Educational Leadership', 'Curriculum and Instruction', 'Educational Psychology', 'Special Education', 'Educational Technology'],
      certifications: ['Teaching License', 'Educational Leadership Certification', 'Special Education Certification', 'ESL Certification', 'Instructional Design Certificate']
    }
  };
```

# lib/generators/basicInfo.js

```js
const { faker } = require('@faker-js/faker');

/**
 * Generate basic personal information
 * @param {Object} options Options for generation
 * @param {string} options.gender Gender (male, female)
 * @param {string} options.phoneFormat Format for phone generation
 * @param {boolean} options.includeLinkedin Include LinkedIn profile
 * @param {boolean} options.includeWebsite Include personal website
 * @returns {Object} Basic information object
 */
function generateBasicInfo(options) {
  const gender = options.gender || (Math.random() > 0.5 ? 'male' : 'female');
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  
  return {
    name: `${firstName} ${lastName}`,
    contactInfo: {
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.helpers.fromRegExp(options.phoneFormat || '[0-9]{3}-[0-9]{3}-[0-9]{4}'),
      location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
      linkedin: options.includeLinkedin ? `linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${faker.string.numeric(6)}` : null,
      website: options.includeWebsite ? `${firstName.toLowerCase()}${lastName.toLowerCase()}.com` : null
    }
  };
}

module.exports = {
  generateBasicInfo
};
```

# lib/generators/certifications.js

```js
const { randomInt, pickMultiple } = require('../utils');

/**
 * Generate certifications based on industry and experience
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @returns {Array} Array of certifications
 */
function generateCertifications(industryData, experienceYears) {
  if (experienceYears < 2 && Math.random() > 0.5) {
    return [];
  }
  
  const certCount = experienceYears < 3 ? randomInt(0, 1) :
                   experienceYears < 7 ? randomInt(1, 2) :
                   randomInt(2, 4);
  
  return pickMultiple(industryData.certifications, 0, certCount);
}

module.exports = {
  generateCertifications
};
```

# lib/generators/education.js

```js
const { faker } = require('@faker-js/faker');
const { randomInt, pickRandom, pickMultiple } = require('../utils');

/**
 * Generate education history
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @param {Object} options Options for generation
 * @returns {Array} Array of education entries
 */
function generateEducation(industryData, experienceYears, options) {
  const degree = experienceYears >= 7 && Math.random() > 0.7
    ? faker.helpers.arrayElement(['Master\'s', 'MBA', 'Ph.D.'])
    : faker.helpers.arrayElement(['Bachelor\'s', 'Associate\'s']);
  
  const field = pickRandom(industryData.degrees);
  const institution = faker.helpers.arrayElement([
    `${faker.location.state()} University`,
    `University of ${faker.location.state()}`,
    `${faker.word.adjective({ capitalize: true })} ${faker.helpers.arrayElement(['College', 'University', 'Institute'])}`,
    `${faker.location.city()} College`
  ]);
  
  const currentYear = new Date().getFullYear();
  const graduationYear = currentYear - (experienceYears + randomInt(0, 2));
  
  const details = [];
  if (Math.random() > 0.5) {
    details.push(`GPA: ${(randomInt(30, 40) / 10).toFixed(1)}`);
  }
  
  if (Math.random() > 0.6) {
    details.push(`${faker.helpers.arrayElement(['Relevant coursework', 'Specialized in', 'Focus area'])}: ${pickMultiple(industryData.skills, 2, 3).join(', ')}`);
  }
  
  if (Math.random() > 0.7) {
    details.push(`${faker.helpers.arrayElement(['Member of', 'Participated in', 'Active in'])} ${faker.helpers.arrayElement(['Student Association', 'Honor Society', 'Research Group', 'Campus Organization'])}`);
  }
  
  const education = [{
    degree,
    field,
    institution,
    graduationYear,
    details
  }];
  
  // Add a second degree sometimes
  if (experienceYears > 5 && Math.random() > 0.7) {
    const secondDegree = {
      degree: degree === 'Bachelor\'s' ? faker.helpers.arrayElement(['Master\'s', 'MBA', 'Ph.D.']) : 'Bachelor\'s',
      field: pickRandom(industryData.degrees),
      institution: faker.helpers.arrayElement([
        `${faker.location.state()} University`,
        `University of ${faker.location.state()}`,
        `${faker.word.adjective({ capitalize: true })} ${faker.helpers.arrayElement(['College', 'University', 'Institute'])}`,
        `${faker.location.city()} College`
      ]),
      graduationYear: degree === 'Bachelor\'s' ? graduationYear - randomInt(2, 5) : graduationYear + randomInt(2, 4),
      details: []
    };
    
    education.push(secondDegree);
  }
  
  return education;
}

module.exports = {
  generateEducation
};
```

# lib/generators/experience.js

```js
const { faker } = require('@faker-js/faker');
const { randomInt, pickRandom, pickMultiple, generateDateRange } = require('../utils');

/**
 * Generate work experience
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @param {Object} options Options for generation
 * @returns {Array} Array of work experiences
 */
function generateExperience(industryData, experienceYears, options) {
  const jobCount = Math.min(
    experienceYears <= 3 ? randomInt(1, 2) :
    experienceYears <= 7 ? randomInt(2, 3) :
    randomInt(3, 5),
    5
  );
  
  const experience = [];
  let remainingYears = experienceYears;
  let monthsAgo = 0;
  
  for (let i = 0; i < jobCount; i++) {
    const isCurrent = i === 0;
    const jobYears = i === jobCount - 1 
      ? remainingYears 
      : Math.min(randomInt(1, 3), remainingYears);
    
    remainingYears -= jobYears;
    
    const dateRange = generateDateRange(jobYears, monthsAgo, isCurrent);
    monthsAgo += jobYears * 12 + randomInt(0, 3);
    
    const jobTitle = pickRandom(industryData.jobTitles);
    const company = pickRandom(industryData.companies);
    const jobSkills = pickMultiple(industryData.skills, 3, 6);
    
    // Generate bullet points based on job level and industry
    const bulletPointCount = randomInt(3, 5);
    const bulletPoints = [];
    
    const actionVerbs = [
      'Developed', 'Implemented', 'Designed', 'Led', 'Managed', 'Created',
      'Built', 'Established', 'Improved', 'Optimized', 'Launched', 'Spearheaded'
    ];
    
    for (let j = 0; j < bulletPointCount; j++) {
      const verb = pickRandom(actionVerbs);
      const skill = pickRandom(jobSkills);
      
      let result;
      switch (j % 3) {
        case 0:
          result = `${verb} ${faker.word.adjective()} ${skill} solution${faker.helpers.maybe(() => 's', { probability: 0.5 })}, resulting in ${randomInt(10, 40)}% improvement in ${faker.helpers.arrayElement(['efficiency', 'performance', 'productivity', 'user satisfaction'])}`;
          break;
        case 1:
          result = `${verb} cross-functional team${faker.helpers.maybe(() => 's', { probability: 0.5 })} to ${faker.helpers.arrayElement(['implement', 'design', 'develop', 'deploy'])} ${skill} ${faker.helpers.arrayElement(['systems', 'solutions', 'frameworks', 'approaches'])}`;
          break;
        case 2:
          result = `${faker.helpers.arrayElement(['Collaborated with', 'Partnered with', 'Worked closely with'])} ${faker.helpers.arrayElement(['stakeholders', 'clients', 'team members', 'executives'])} to ${faker.helpers.arrayElement(['deliver', 'enhance', 'optimize', 'transform'])} ${skill} capabilities`;
          break;
      }
      
      bulletPoints.push(result);
    }
    
    experience.push({
      position: jobTitle,
      company,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      bulletPoints
    });
  }
  
  return experience;
}

module.exports = {
  generateExperience
};
```

# lib/generators/index.js

```js
/**
 * Consolidated exports for all resume generators
 */
const { generateBasicInfo } = require('./basicInfo');
const { generateSummary } = require('./summary');
const { generateExperience } = require('./experience');
const { generateEducation } = require('./education');
const { generateSkills } = require('./skills');
const { generateCertifications } = require('./certifications');

module.exports = {
  generateBasicInfo,
  generateSummary,
  generateExperience,
  generateEducation,
  generateSkills,
  generateCertifications
};
```

# lib/generators/skills.js

```js
const { pickMultiple } = require('../utils');

/**
 * Generate skills sections
 * @param {Object} industryData Industry-specific data
 * @returns {Array} Array of skill categories
 */
function generateSkills(industryData) {
  const technicalSkills = pickMultiple(industryData.skills, 6, 10);
  
  // Generate generic soft skills
  const softSkills = pickMultiple([
    'Team Leadership', 'Project Management', 'Communication', 'Problem Solving',
    'Critical Thinking', 'Time Management', 'Collaboration', 'Adaptability',
    'Creativity', 'Decision Making', 'Conflict Resolution', 'Presentation Skills'
  ], 3, 6);
  
  return [
    {
      category: 'Technical Skills',
      skills: technicalSkills.join(', ')
    },
    {
      category: 'Soft Skills',
      skills: softSkills.join(', ')
    }
  ];
}

module.exports = {
  generateSkills
};
```

# lib/generators/summary.js

```js
const { pickMultiple } = require('../utils');

/**
 * Generate professional summary
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @param {Object} options Options for generation
 * @returns {string} Professional summary
 */
function generateSummary(industryData, experienceYears, options) {
  const jobTitles = pickMultiple(industryData.jobTitles, 1, 2);
  const skills = pickMultiple(industryData.skills, 3, 5);
  
  let summary = '';
  if (experienceYears < 3) {
    summary = `Enthusiastic ${jobTitles[0]} with ${experienceYears} years of experience and a passion for ${skills.slice(0, 2).join(' and ')}. Seeking to leverage strong ${skills[2]} skills to drive innovative solutions and grow professionally.`;
  } else if (experienceYears < 8) {
    summary = `Experienced ${jobTitles[0]} with ${experienceYears} years of proven expertise in ${skills.slice(0, 3).join(', ')}. Demonstrated success in delivering high-quality solutions and collaborating effectively with cross-functional teams.`;
  } else {
    summary = `Seasoned ${jobTitles[0]} with over ${experienceYears} years of experience specializing in ${skills.slice(0, 3).join(', ')}. Proven track record of leadership and delivering strategic initiatives that drive business growth and technological advancement.`;
  }
  
  return summary;
}

module.exports = {
  generateSummary
};
```

# lib/index.js

```js
const mustache = require('mustache');
const industries = require('./data/industries');
const defaultTemplate = require('./templates/default');
const generators = require('./generators');

/**
 * Generate a resume with specified options
 * @param {Object} options Resume generation options
 * @param {string} options.industry Industry specialization
 * @param {number} options.experienceYears Years of experience
 * @param {string} options.format Output format (markdown, json, both, pdf)
 * @param {string} options.gender Gender for name generation (male, female)
 * @param {boolean} options.includeLinkedin Include LinkedIn profile
 * @param {boolean} options.includeWebsite Include personal website
 * @param {string} options.phoneFormat Format for phone number generation
 * @param {string} options.template Custom Mustache template
 * @param {string} options.pdfStyle PDF style (default, modern, minimal, professional)
 * @param {string} options.pdfColor Primary color for PDF styling
 * @returns {Object} Generated resume data and formatted output
 */
function generateResume(options = {}) {
  // Set default options
  const defaultOptions = {
    industry: 'tech',
    experienceYears: 5,
    format: 'both',
    gender: Math.random() > 0.5 ? 'male' : 'female',
    includeLinkedin: true,
    includeWebsite: Math.random() > 0.5,
    phoneFormat: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
    template: defaultTemplate,
    pdfStyle: 'default',
    pdfColor: '#0066cc'
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Validate industry
  if (!industries[mergedOptions.industry]) {
    throw new Error(`Invalid industry: ${mergedOptions.industry}. Available industries: ${Object.keys(industries).join(', ')}`);
  }
  
  const industryData = industries[mergedOptions.industry];
  
  // Generate resume data
  const basicInfo = generators.generateBasicInfo(mergedOptions);
  const summary = generators.generateSummary(industryData, mergedOptions.experienceYears, mergedOptions);
  const experience = generators.generateExperience(industryData, mergedOptions.experienceYears, mergedOptions);
  const education = generators.generateEducation(industryData, mergedOptions.experienceYears, mergedOptions);
  const skillCategories = generators.generateSkills(industryData);
  const certifications = generators.generateCertifications(industryData, mergedOptions.experienceYears);
  
  // Combine all data
  const resumeData = {
    ...basicInfo,
    summary,
    experience,
    education,
    skillCategories,
    certifications
  };
  
  // Generate output in the requested format
  let output = {};
  
  if (mergedOptions.format === 'json' || mergedOptions.format === 'both') {
    output.json = resumeData;
  }
  
  if (mergedOptions.format === 'markdown' || mergedOptions.format === 'both' || mergedOptions.format === 'pdf') {
    const templateToUse = mergedOptions.template || defaultTemplate;
    output.markdown = mustache.render(templateToUse, resumeData);
  }
  
  return output;
}

// Export the available industries for validation purposes
const availableIndustries = Object.keys(industries);

module.exports = {
  generateResume,
  availableIndustries
};
```

# lib/pdf/batchGenerator.js

```js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pdfStyles = require('../templates/styles');

/**
 * Generate a batch PDF from multiple markdown files
 * @param {string[]} markdownFiles Array of paths to markdown files
 * @param {string} outputFile Path to the output PDF file
 * @param {Object} options PDF generation options
 * @param {string} options.style PDF style (default, modern, minimal, professional)
 * @param {string} options.color Primary color (hex code)
 * @param {string[]} options.names Array of resume names
 * @returns {Promise<void>} Promise that resolves when PDF is generated
 */
async function generateBatchPDF(markdownFiles, outputFile, options = {}) {
  try {
    // Dynamically import the required modules only when needed
    const showdown = require('showdown');
    const puppeteer = require('puppeteer');
    
    const style = options.style || 'default';
    const color = options.color || '#0066cc';
    const names = options.names || [];
    
    // Get the CSS for the selected style with page break support
    const css = pdfStyles.getStyleWithPageBreaks(style, color);
    
    // Convert markdown to HTML for each file and combine them
    const converter = new showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true
    });
    
    let combinedHtml = '';
    
    // Process each markdown file and add page breaks between them
    for (let i = 0; i < markdownFiles.length; i++) {
      const markdown = fs.readFileSync(markdownFiles[i], 'utf8');
      const html = converter.makeHtml(markdown);
      
      // Get the resume name for this file
      const resumeName = i < names.length ? names[i] : `Resume ${i+1}`;
      
      // Wrap each resume in a div with a data attribute for identification
      combinedHtml += `<div class="resume" data-name="${resumeName}">${html}</div>`;
      
      // Add page break after each resume except the last one
      if (i < markdownFiles.length - 1) {
        combinedHtml += '<div class="page-break"></div>';
      }
    }
    
    // Create a full HTML document with styles
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Batch Resumes</title>
        <style>
          ${css}
          .resume {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        ${combinedHtml}
      </body>
      </html>
    `;
    
    // Create a temporary HTML file
    const tempHtmlFile = `${path.dirname(outputFile)}/.temp-batch-resumes.html`;
    fs.writeFileSync(tempHtmlFile, fullHtml);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new' // Use new headless mode for newer Puppeteer versions
    });
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file://${path.resolve(tempHtmlFile)}`, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
      path: outputFile,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    });
    
    // Close the browser
    await browser.close();
    
    // Remove the temporary HTML file
    fs.unlinkSync(tempHtmlFile);
  } catch (error) {
    console.error(chalk.red(`Error generating batch PDF: ${error.message}`));
    throw error;
  }
}

module.exports = {
  generateBatchPDF
};
```

# lib/pdf/generator.js

```js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pdfStyles = require('../templates/styles');

/**
 * Generate a PDF from a markdown file
 * @param {string} markdownFile Path to the markdown file
 * @param {string} outputFile Path to the output PDF file
 * @param {Object} options PDF generation options
 * @param {string} options.style PDF style (default, modern, minimal, professional)
 * @param {string} options.color Primary color (hex code)
 * @param {string} options.name Resume name for title
 * @returns {Promise<void>} Promise that resolves when PDF is generated
 */
async function generatePDF(markdownFile, outputFile, options = {}) {
  try {
    // Dynamically import the required modules only when PDF generation is needed
    // This prevents errors if these dependencies aren't installed
    const showdown = require('showdown');
    const puppeteer = require('puppeteer');
    
    const style = options.style || 'default';
    const color = options.color || '#0066cc';
    const name = options.name || 'Resume';
    
    // Get the appropriate CSS for the selected style
    const css = pdfStyles.getStyle(style, color);
    
    // Convert markdown to HTML using showdown
    const converter = new showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true
    });
    
    const markdown = fs.readFileSync(markdownFile, 'utf8');
    const html = converter.makeHtml(markdown);
    
    // Create a full HTML document with styles
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${name} - Resume</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    
    // Create a temporary HTML file
    const tempHtmlFile = `${path.dirname(outputFile)}/.temp-${path.basename(outputFile, '.pdf')}.html`;
    fs.writeFileSync(tempHtmlFile, fullHtml);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new' // Use new headless mode for newer Puppeteer versions
    });
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file://${path.resolve(tempHtmlFile)}`, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
      path: outputFile,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    });
    
    // Close the browser
    await browser.close();
    
    // Remove the temporary HTML file
    fs.unlinkSync(tempHtmlFile);
  } catch (error) {
    console.error(chalk.red(`Error generating PDF: ${error.message}`));
    throw error;
  }
}

module.exports = {
  generatePDF
};
```

# lib/templates/default.js

```js
/**
 * Default markdown template for resumes
 */
module.exports = `# {{name}}

{{contactInfo.email}} | {{contactInfo.phone}} | {{contactInfo.location}}{{#contactInfo.linkedin}} | [LinkedIn]({{contactInfo.linkedin}}){{/contactInfo.linkedin}}{{#contactInfo.website}} | [Website]({{contactInfo.website}}){{/contactInfo.website}}

## Summary
{{summary}}

## Experience
{{#experience}}
### {{position}} | {{company}} | {{startDate}} - {{endDate}}
{{#bulletPoints}}
- {{.}}
{{/bulletPoints}}

{{/experience}}

## Education
{{#education}}
### {{degree}} in {{field}} | {{institution}} | {{graduationYear}}
{{#details}}
- {{.}}
{{/details}}

{{/education}}

## Skills
{{#skillCategories}}
### {{category}}
{{skills}}

{{/skillCategories}}

{{#certifications.length}}
## Certifications
{{#certifications}}
- {{.}}
{{/certifications}}
{{/certifications.length}}
`;
```

# lib/templates/styles.js

```js
/**
 * PDF styles for different resume formats
 */

/**
 * Get CSS for the specified style
 * @param {string} style Style name (default, modern, minimal, professional)
 * @param {string} color Primary color (hex code)
 * @returns {string} CSS styling
 */
function getStyle(style, color) {
  const styles = {
    default: `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: ${color};
        border-bottom: 2px solid ${color};
        padding-bottom: 5px;
      }
      h2 {
        color: ${color};
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      }
      h3 {
        margin-bottom: 5px;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
    `,
    modern: `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
      }
      h1 {
        color: ${color};
        font-size: 28px;
        letter-spacing: -0.5px;
        margin-bottom: 5px;
      }
      h2 {
        color: ${color};
        font-size: 22px;
        letter-spacing: -0.5px;
        margin-top: 25px;
        border-left: 4px solid ${color};
        padding-left: 10px;
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
        font-weight: 600;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `,
    minimal: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #222;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      h2 {
        font-size: 18px;
        margin-top: 25px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        font-weight: 500;
        color: ${color};
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `,
    professional: `
      body {
        font-family: 'Garamond', 'Times New Roman', serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #222;
      }
      h1 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 5px;
        color: ${color};
      }
      h2 {
        font-size: 22px;
        margin-top: 25px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        color: ${color};
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `
  };
  
  return styles[style] || styles.default;
}

/**
 * Get CSS for the specified style with additional page break support
 * @param {string} style Style name (default, modern, minimal, professional)
 * @param {string} color Primary color (hex code)
 * @returns {string} CSS styling with page break rules
 */
function getStyleWithPageBreaks(style, color) {
  const baseStyle = getStyle(style, color);
  
  // Add page break class
  const pageBreakStyle = `
    /* Page break class for multi-resume PDFs */
    .page-break {
      page-break-after: always;
      height: 0;
      margin: 0;
    }
  `;
  
  return baseStyle + pageBreakStyle;
}

module.exports = {
  getStyle,
  getStyleWithPageBreaks
};
```

# lib/utils.js

```js
/**
 * Utility functions for resume generation
 */

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Pick a random item from an array
   * @param {Array} array Source array
   * @returns {*} Random item
   */
  function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  /**
   * Pick multiple random items from an array
   * @param {Array} array Source array
   * @param {number} min Minimum number of items
   * @param {number} max Maximum number of items
   * @returns {Array} Array of random items
   */
  function pickMultiple(array, min, max) {
    const count = randomInt(min, max);
    const result = [];
    const copy = [...array];
    
    for (let i = 0; i < count && copy.length > 0; i++) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
    
    return result;
  }
  
  /**
   * Generate a date range for work experience
   * @param {number} yearsAgo How many years ago the job started
   * @param {number} monthsAgo How many months ago the job ended
   * @param {boolean} isCurrent Whether this is the current job
   * @returns {Object} Object with startDate and endDate strings
   */
  function generateDateRange(yearsAgo, monthsAgo, isCurrent = false) {
    const endDate = new Date();
    if (!isCurrent) {
      endDate.setMonth(endDate.getMonth() - monthsAgo);
    }
    
    const startDate = new Date(endDate);
    startDate.setFullYear(startDate.getFullYear() - yearsAgo);
    
    const formatDate = (date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month} ${date.getFullYear()}`;
    };
    
    return {
      startDate: formatDate(startDate),
      endDate: isCurrent ? 'Present' : formatDate(endDate)
    };
  }
  
  module.exports = {
    randomInt,
    pickRandom,
    pickMultiple,
    generateDateRange
  };
```

# norma-simonis.json

```json
{
  "name": "Norma Simonis",
  "contactInfo": {
    "email": "norma_simonis@hotmail.com",
    "phone": "124-765-9614",
    "location": "West Rey, WI",
    "linkedin": "linkedin.com/in/norma-simonis-411561",
    "website": "normasimonis.com"
  },
  "summary": "Experienced Machine Learning Engineer with 5 years of proven expertise in React, Vue.js, Redis. Demonstrated success in delivering high-quality solutions and collaborating effectively with cross-functional teams.",
  "experience": [
    {
      "position": "Backend Developer",
      "company": "TechCorp",
      "startDate": "March 2022",
      "endDate": "Present",
      "bulletPoints": [
        "Launched giant Docker solutions, resulting in 28% improvement in performance",
        "Led cross-functional teamundefined to implement Angular approaches",
        "Partnered with stakeholders to deliver Kubernetes capabilities",
        "Implemented simple Angular solutions, resulting in 21% improvement in efficiency",
        "Created cross-functional teams to deploy Git systems"
      ]
    },
    {
      "position": "UX Designer",
      "company": "NextGen Computing",
      "startDate": "March 2021",
      "endDate": "March 2022",
      "bulletPoints": [
        "Designed virtuous Redis solutionundefined, resulting in 14% improvement in efficiency",
        "Built cross-functional teams to develop Python systems",
        "Partnered with stakeholders to enhance MongoDB capabilities"
      ]
    },
    {
      "position": "Data Scientist",
      "company": "DevStream",
      "startDate": "March 2020",
      "endDate": "March 2021",
      "bulletPoints": [
        "Optimized cheery Git solutionundefined, resulting in 32% improvement in efficiency",
        "Spearheaded cross-functional teamundefined to deploy TensorFlow approaches",
        "Partnered with clients to transform Kubernetes capabilities",
        "Created sneaky React solutions, resulting in 15% improvement in productivity"
      ]
    }
  ],
  "education": [
    {
      "degree": "Associate's",
      "field": "Data Science",
      "institution": "University of Nevada",
      "graduationYear": 2020,
      "details": [
        "Focus area: PyTorch, Angular"
      ]
    }
  ],
  "skillCategories": [
    {
      "category": "Technical Skills",
      "skills": "Python, CI/CD, Vue.js, AWS, JavaScript, Git, TypeScript, MongoDB"
    },
    {
      "category": "Soft Skills",
      "skills": "Adaptability, Project Management, Communication, Critical Thinking, Presentation Skills, Team Leadership"
    }
  ],
  "certifications": []
}
```

# norma-simonis.md

```md
# Norma Simonis

norma_simonis@hotmail.com | 124-765-9614 | West Rey, WI | [LinkedIn](linkedin.com&#x2F;in&#x2F;norma-simonis-411561) | [Website](normasimonis.com)

## Summary
Experienced Machine Learning Engineer with 5 years of proven expertise in React, Vue.js, Redis. Demonstrated success in delivering high-quality solutions and collaborating effectively with cross-functional teams.

## Experience
### Backend Developer | TechCorp | March 2022 - Present
- Launched giant Docker solutions, resulting in 28% improvement in performance
- Led cross-functional teamundefined to implement Angular approaches
- Partnered with stakeholders to deliver Kubernetes capabilities
- Implemented simple Angular solutions, resulting in 21% improvement in efficiency
- Created cross-functional teams to deploy Git systems

### UX Designer | NextGen Computing | March 2021 - March 2022
- Designed virtuous Redis solutionundefined, resulting in 14% improvement in efficiency
- Built cross-functional teams to develop Python systems
- Partnered with stakeholders to enhance MongoDB capabilities

### Data Scientist | DevStream | March 2020 - March 2021
- Optimized cheery Git solutionundefined, resulting in 32% improvement in efficiency
- Spearheaded cross-functional teamundefined to deploy TensorFlow approaches
- Partnered with clients to transform Kubernetes capabilities
- Created sneaky React solutions, resulting in 15% improvement in productivity


## Education
### Associate&#39;s in Data Science | University of Nevada | 2020
- Focus area: PyTorch, Angular


## Skills
### Technical Skills
Python, CI&#x2F;CD, Vue.js, AWS, JavaScript, Git, TypeScript, MongoDB

### Soft Skills
Adaptability, Project Management, Communication, Critical Thinking, Presentation Skills, Team Leadership



```

# norma-simonis.pdf

This is a binary file of the type: PDF

# package.json

```json
{
  "name": "faux-cv",
  "version": "1.0.0",
  "description": "Generate realistic fake resumes in markdown, JSON, and PDF formats",
  "main": "lib/index.js",
  "bin": {
    "faux-cv": "./bin/cli.js"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "keywords": [
    "resume",
    "cv",
    "generator",
    "fake",
    "mock",
    "sample",
    "markdown",
    "json",
    "pdf"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "@faker-js/faker": "^8.0.2",
    "chalk": "^4.1.2",
    "commander": "^11.0.0",
    "mustache": "^4.2.0"
  },
  "optionalDependencies": {
    "puppeteer": "^22.0.0",
    "showdown": "^2.1.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "mock-fs": "^5.2.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

# README.md

```md
## PDF Generation

To use the PDF generation feature, you'll need to install the optional dependencies:

\`\`\`bash
npm install puppeteer showdown
\`\`\`

These are listed as optional dependencies in the package.json to keep the main package lightweight for users who don't need PDF functionality.# faux-cv

Generate realistic fake resumes in markdown and JSON formats with customizable options for different industries, experience levels, and more.

## Installation

\`\`\`bash
npm install -g faux-cv
\`\`\`

Or use directly with npx:

\`\`\`bash
npx faux-cv
\`\`\`

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

\`\`\`bash
npx faux-cv --industry tech --experience 7 --format both
\`\`\`

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
\`\`\`bash
npx faux-cv -i tech -e 3
\`\`\`

Generate 5 healthcare resumes with 10+ years of experience:
\`\`\`bash
npx faux-cv -i healthcare -e 12 -c 5
\`\`\`

Generate a finance resume in JSON format only:
\`\`\`bash
npx faux-cv -i finance -f json
\`\`\`

Generate a professional PDF resume with custom styling:
\`\`\`bash
npx faux-cv -f pdf -p professional --pdf-color "#336699"
\`\`\`

Generate multiple resumes in a single batch PDF file:
\`\`\`bash
npx faux-cv -c 5 -f pdf -b -i marketing
\`\`\`

Use a custom template:
\`\`\`bash
npx faux-cv -t ./my-template.mustache
\`\`\`

## Programmatic Usage

You can also use faux-cv as a library in your Node.js projects:

\`\`\`javascript
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
\`\`\`

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

MIT
```

# templates/modern.css

```css
/* Modern resume style for faux-cv 
 * Save this in templates/modern.css and use with --template flag 
 */

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

header {
  margin-bottom: 30px;
}

h1 {
  color: var(--primary-color, #0066cc);
  font-size: 28px;
  letter-spacing: -0.5px;
  margin-bottom: 5px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 14px;
}

.contact-info a {
  color: var(--primary-color, #0066cc);
  text-decoration: none;
}

h2 {
  color: var(--primary-color, #0066cc);
  font-size: 22px;
  letter-spacing: -0.5px;
  margin-top: 25px;
  border-left: 4px solid var(--primary-color, #0066cc);
  padding-left: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 600;
}

.job-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.job-title {
  font-weight: bold;
}

.job-date {
  color: #666;
  font-style: italic;
}

ul {
  padding-left: 20px;
}

ul li {
  margin-bottom: 5px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
}

.skill-item {
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 14px;
}

.skill-item.highlight {
  background-color: var(--primary-color, #0066cc);
  color: white;
}

```

