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