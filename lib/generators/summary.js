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