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