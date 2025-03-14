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