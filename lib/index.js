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
  
  console.log('Format option:', mergedOptions.format); // Debugging line
  
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
  
  console.log('Generated resume data:', resumeData); // Debugging line
  
  // Generate output in the requested format
  let output = {};
  
  // Handle JSON format
  if (mergedOptions.format === 'json' || mergedOptions.format === 'both') {
    output.json = resumeData;
  }
  
  // Handle markdown format (including PDF which uses markdown)
  if (mergedOptions.format === 'markdown' || mergedOptions.format === 'both' || mergedOptions.format === 'pdf') {
    const templateToUse = mergedOptions.template || defaultTemplate;
    output.markdown = mustache.render(templateToUse, resumeData);
  }
  
  console.log('Output object:', output); // Debugging line
  return output;
}

// Export the available industries for validation purposes
const availableIndustries = Object.keys(industries);

module.exports = {
  generateResume,
  availableIndustries
};